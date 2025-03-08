import { View, Text, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import recentTransactionStyles from '../../styles/stylesRecentTransaction';
import TransactionCard from './transactionCard';
import KshirsaSkeletonLoader from '../../small-components/KshirsaSkeletonLoader';
import getRecentTransactionsAction from '../../redux/actions/getRecentTransactionAction';
import KshirsaNoDataImage from '../../../assets/animatedImage/noDataImage';
import uiText from '../../constants/uiTexts';
import deleteTransactionAction from '../../redux/actions/deleteTransactionAction';
import addTransactionAction from '../../redux/actions/addTransactionAction';
import { createDuplicateTransactionPayload } from '../../utils/helper';

const { height } = Dimensions.get('window'); // Get screen height

const RecentTransaction = () => {
  const dispatch = useDispatch();
  const [swipeIndex, setSwipeIndex] = useState(null);
  const { loading: recentTransactionLoading, data: recentTransactionData } =
    useSelector((state) => state.getRecentTransactionsReducer) || {};
  const { loading: deletetransactionLoading, data: deleteTransactionData, success: deleteTransactionSuccess } =
    useSelector((state) => state.deleteTransactionReducer) || {};
    const {success: addDuplicateTransactionSuccess} = useSelector((state) => state.addTransactionReducer);


  const scrollY = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  useEffect(() => {
    dispatch(getRecentTransactionsAction());
  }, [dispatch]);

  useEffect(() => {
    if(deleteTransactionSuccess || addDuplicateTransactionSuccess) dispatch(getRecentTransactionsAction());
  }, [deleteTransactionSuccess, addDuplicateTransactionSuccess]);

  const onEdit = (transactionData) => {
    dispatch(addTransactionAction(createDuplicateTransactionPayload(transactionData)))
  };

  const onDelete = (transactionData) => {
    dispatch(deleteTransactionAction({ transactionId: String(transactionData?.transactionId) }));
  };

  return (
    <View style={recentTransactionStyles.container}>
      {/* Header */}
      <View style={recentTransactionStyles.titleWrapper}>
        <Text style={recentTransactionStyles.title}>Recent Transactions</Text>
        <Text style={recentTransactionStyles.seeAllText}>See All</Text>
      </View>

      {/* Skeleton Loader */}
      {recentTransactionLoading ? (
        <KshirsaSkeletonLoader count={3} />
      ) : recentTransactionData?.length > 0 ? (
        // Transaction List
        <Animated.FlatList
          data={recentTransactionData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TransactionCard transactionData={item} index={index} swipeIndex={swipeIndex} setSwipeIndex={setSwipeIndex} onEdit={onEdit} onDelete={onDelete} />
          )}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        // No Data State
        <View style={recentTransactionStyles.noDataContainer}>
          <KshirsaNoDataImage />
          <Text style={recentTransactionStyles.noDataText}>{uiText.NO_RECENT_TRANSACTION}</Text>
        </View>
      )}
    </View>
  );
};

export default RecentTransaction;

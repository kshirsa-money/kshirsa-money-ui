import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import recentTransactionStyles from '../../styles/stylesRecentTransaction';
import TransactionCard from './transactionCard';
import getRecentTransactionsAction from '../../redux/actions/getRecentTransactionAction';
import KshirsaNoDataImage from '../../../assets/animatedImage/noDataImage';
import uiText from '../../constants/uiTexts';
import deleteTransactionAction from '../../redux/actions/deleteTransactionAction';
import addTransactionAction from '../../redux/actions/addTransactionAction';
import { createDuplicateTransactionPayload } from '../../utils/helper';
import { useRouter } from 'expo-router';
import uiRoutes from '../../constants/uiRoutes';
import KshirsaMoneyLoadingImg from '../../../assets/animatedImage/moneyLoadingImage';
import { KshirsaAlert } from '../../small-components/KshirsaAlert';
import { resetDeleteTransactionAction } from '../../redux/reducers/deleteTransactionReducer';
import { resetaddTransactionAction } from '../../redux/reducers/addTransactionReducer';
import { resetUpdateTransactionAction } from '../../redux/reducers/updateTransactionReducer';
import { renderDeleteOrDuplicateSuccessToast } from '../../constants/ToastRender';
import Colors from '../../styles/Colors';

const RecentTransaction = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const swipeableRef = useRef(null);
  const [swipeIndex, setSwipeIndex] = useState(null);
  const { loading: recentTransactionLoading, data: recentTransactionData } = useSelector((state) => state.getRecentTransactionsReducer) || {};
    const addTransactionResponse = useSelector((state) => state.addTransactionReducer);
  const { loading: deletetransactionLoading, data: deleteTransactionData, success: deleteTransactionSuccess } =
    useSelector((state) => state.deleteTransactionReducer) || {};
    const {success: addDuplicateTransactionSuccess} = useSelector((state) => state.addTransactionReducer);
      const { success: updateTransactionSuccess } = useSelector((state) => state.updateTransactionReducer);

  const scrollY = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });
  //-----------------------------call recent transaction when no data or add transaction success or update transaction success-----------------------------
  useEffect(() => {
    if(!recentTransactionData || addTransactionResponse.success || updateTransactionSuccess) dispatch(getRecentTransactionsAction());

    return () => {
      dispatch(resetaddTransactionAction());
      dispatch(resetUpdateTransactionAction());
      dispatch(resetDeleteTransactionAction());
    };
  }, [dispatch, recentTransactionData, addTransactionResponse.success, updateTransactionSuccess]);

  useEffect(() => {
    if(deleteTransactionSuccess || addDuplicateTransactionSuccess) {
      dispatch(getRecentTransactionsAction());
      renderDeleteOrDuplicateSuccessToast(deleteTransactionSuccess);
      dispatch(resetDeleteTransactionAction());
      dispatch(resetaddTransactionAction());
    }
  }, [deleteTransactionSuccess, addDuplicateTransactionSuccess]);

  const onEdit = (transactionData) => {
    KshirsaAlert.alert(
              'Duplicate Transaction',
              'Are you sure you want to add duplicate this transaction?',
              [
                { text: 'Cancel', style: 'secondary' },
                { text: 'Add Duplicate', onPress: () => dispatch(addTransactionAction(createDuplicateTransactionPayload(transactionData))) },
              ]
            );
  };

  const onDelete = (transactionData) => {
    KshirsaAlert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        { text: 'Cancel', style: 'secondary' },
        { text: 'Delete!',
          onPress: () => dispatch(deleteTransactionAction({ transactionId: String(transactionData?.transactionId) })),
          loading: deletetransactionLoading,
          close: deleteTransactionSuccess
         }
      ]
    );
  };

  const onPress = (transactionData) => {
    router.push({
      pathname: uiRoutes.editTransaction,
      params: { transactionId: transactionData?.transactionId },
    });
  }
  return (
    <View style={recentTransactionStyles.container}>
      {/* Header */}
      <View style={recentTransactionStyles.titleWrapper}>
        <Text style={recentTransactionStyles.title}>Recent Transactions</Text>
        <TouchableOpacity onPress={() => router.push(uiRoutes.allTransactions)} style={{padding: 5, backgroundColor: Colors.generalFocusBg, borderRadius: 5}}>
        <Text style={recentTransactionStyles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* Skeleton Loader */}
      {recentTransactionLoading ? (
        // <KshirsaSkeletonLoader count=\{3} />
        <KshirsaMoneyLoadingImg />
      ) : recentTransactionData?.length > 0 ? (
        // Transaction List
        <Animated.FlatList
          data={recentTransactionData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TransactionCard transactionData={item} index={index} swipeIndex={swipeIndex} setSwipeIndex={setSwipeIndex} onDuplicate={onEdit} onDelete={onDelete} onPress={onPress} swipeableRef={swipeableRef} />
          )}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{gap: 20}}
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

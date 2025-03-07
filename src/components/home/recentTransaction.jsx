import { View, Text, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
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

const { height } = Dimensions.get('window'); // Get screen height

const AnimatedTransactionCard = ({ transactionData, index, scrollY }) => {
  const translateY = useSharedValue(50);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const startAnimation = scrollY.value + height > index * 120; // Check if the card is in view
    if (startAnimation) {
      translateY.value = withTiming(0, { duration: 400 });
      opacity.value = withTiming(1, { duration: 400 });
    }
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <TransactionCard transactionData={transactionData} />
    </Animated.View>
  );
};

const RecentTransaction = () => {
  const dispatch = useDispatch();
  const { loading: recentTransactionLoading, data: recentTransactionData } =
    useSelector((state) => state.getRecentTransactionsReducer) || {};

  const scrollY = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  useEffect(() => {
    dispatch(getRecentTransactionsAction());
  }, [dispatch]);

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
            <AnimatedTransactionCard
              transactionData={item}
              index={index}
              scrollY={scrollY}
            />
          )}
          onScroll={handleScroll}
          scrollEventThrottle={16} // Smooth scrolling
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

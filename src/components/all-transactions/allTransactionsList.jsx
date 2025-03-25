import React, { useCallback, useEffect, useRef } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import moment from 'moment';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withDelay } from 'react-native-reanimated';
import TransactionCard from '../home/transactionCard';
import { screenHeight } from '../../constants/utils';
import allTransactionsStyle from '../../styles/stylesAllTransactions';
import Colors from '../../styles/Colors';
import { RefreshControl } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

const AllTransactionsList = ({ allTransactionData, currentPage, setCurrentPage, onRefresh }) => {
  const swipeableRef = useRef(null);
  const allTransactions = allTransactionData?.transactionList || [];
  const hasNextPage = allTransactionData?.data?.hasNextPage || false;
  const infinityLoading = allTransactionData?.infinityLoading || false;

  // 🟢 Group transactions by date
  const groupedTransactions = React.useMemo(() => {
    const grouped = [];
    let lastDate = null;

    allTransactions?.forEach((transaction) => {
      const formattedDate = moment(transaction?.transactionTime)?.format("YYYY-MM-DD");
      const displayDate = moment(transaction?.transactionTime)?.calendar(null, {
        sameDay: '[Today]',
        lastDay: '[Yesterday]',
        lastWeek: 'dddd, MMM D',
        sameElse: 'MMM D, YYYY',
      });

      if (formattedDate !== lastDate) {
        grouped.push({ type: 'header', title: displayDate });
        lastDate = formattedDate;
      }
      grouped.push({ type: 'transaction', data: transaction });
    });

    return grouped;
  }, [allTransactions]);
  console.log(currentPage, 'currentKing')
  // 🟢 Load More Function
  const handleLoadMore = () => {
    console.log('loadKing')
    if (allTransactions && hasNextPage && !infinityLoading) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 🟢 Render Items
  const renderItem = ({ item, index }) => {
    if (item.type === 'header') {
      return <GlossyText title={item.title} />;
    }

    return (
      <TransactionCard
        transactionData={item.data}
        index={index}
        onDelete={() => {}}
        onDuplicate={() => {}}
        onPress={() => {}}
        fromAllTransaction={true}
        swipeableRef={swipeableRef}
        needDelayAnimation = { currentPage  === 1}
      />
    );
  };

  return (
    <View style={{ flex: 1, position: 'relative', zIndex: 99 }}>
      <FlatList
        data={groupedTransactions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        style={allTransactionsStyle.flatList}
        contentContainerStyle={{ gap: 20, paddingBottom: screenHeight * 0.13 }}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={<RenderInfinityLoader enabledLoading={infinityLoading} />}
        refreshControl={
          <RefreshControl
          onRefresh={onRefresh}
          refreshing={allTransactionData?.loading}
          tintColor={Colors.white}
          colors={[Colors.secondary]}
          progressBackgroundColor={Colors.moodyBlack}
          zIndex={1002}
          progressViewOffset={screenHeight * 0.1}
          />
        }
      />
    </View>
  );
};

export default AllTransactionsList;

const GlossyText = ({ title }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {title.split('').map((char, index) => (
        <AnimatedLetter key={index} char={char} delay={index * 100} />
      ))}
    </View>
  );
};

const AnimatedLetter = ({ char, delay }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(10);

  useEffect(() => {
    // Opacity repeats infinitely, with a slower duration
    opacity.value = withDelay(delay, withRepeat(withTiming(1, { duration: 3000 }), 0, true)); // Slower opacity repetition
    // TranslateY animation does not repeat
    translateY.value = withDelay(delay, withTiming(0, { duration: 500 })); // Normal translateY animation
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.Text style={[{ fontSize: 18, fontWeight: 'bold', color: Colors.white }, animatedStyle]}>
      {char}
    </Animated.Text>
  );
};

// 🟢 Footer Loading Indicator
const RenderInfinityLoader = ({ enabledLoading }) => (
  <View style={{ paddingVertical: 40, justifyContent: 'center', alignItems: 'center' }}>
    {enabledLoading ? <ActivityIndicator size="large" color="white" /> : null}
  </View>
);

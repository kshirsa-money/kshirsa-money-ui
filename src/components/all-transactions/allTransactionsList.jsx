import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import TransactionCard from '../home/transactionCard';
import { ActivityIndicator } from 'react-native';
import KshirsaPullToRefresh from '../../../assets/animatedImage/KshirsaPullToRefresh';
import { screenHeight } from '../../constants/utils';
import allTransactionsStyle from '../../styles/stylesAllTransactions';

const AllTransactionsList = ({allTransactionData, currentPage, setCurrentPage}) => {
    const [swipeIndex, setSwipeIndex] = useState(null);
  const allTransactions = allTransactionData?.transactionList || [];
  const hasNextPage = allTransactionData?.data?.hasNextPage || false;
  const infinityLoading = allTransactionData?.infinityLoading || false;

  //--------------------------------Load More functions--------------------------------
  const handleLoadMore = ()=> {
    if(allTransactions && hasNextPage && !infinityLoading) {
     setCurrentPage((prev) => prev + 1);
    }
  }
  return (
    <View style={{}}>
      <FlatList 
        data={allTransactions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TransactionCard transactionData={item} index={index} swipeIndex={swipeIndex} setSwipeIndex={setSwipeIndex} onEdit={() => {}} onDelete={() => {}} onPress={() => {}} fromAllTransaction={currentPage !== 1} />
        )}
        style={allTransactionsStyle.flatList}
        scrollEventThrottle={16}
        contentContainerStyle={{paddingBottom: screenHeight * 0.13}}
        showsVerticalScrollIndicator={false}
        onEndReached={({ distanceFromEnd }) => {
          handleLoadMore();
      }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderInfinityLoader({enabledLoading: allTransactionData?.infinityLoading})}
      />
    </View>
  )
}

export default AllTransactionsList


const renderInfinityLoader = ({enabledLoading}) => {
    return (
      <View style={{ paddingVertical: 40, paddingBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
       {/* <KshirsaPullToRefresh /> */}
       {enabledLoading ? 
       <ActivityIndicator size="large" color="white" />
       : <View />}
      </View>
    )
}
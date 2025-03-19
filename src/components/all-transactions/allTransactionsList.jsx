import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import TransactionCard from '../home/transactionCard';

const AllTransactionsList = ({allTransactionData}) => {
    const [swipeIndex, setSwipeIndex] = useState(null);
  console.log(allTransactionData?.transactionLis, ' lists')

  return (
    <View>
      <Text style={{color: 'white'}}>AllTransactionsList</Text>
      <FlatList 
        data={allTransactionData?.transactionList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TransactionCard transactionData={item} index={index} swipeIndex={swipeIndex} setSwipeIndex={setSwipeIndex} onEdit={() => {}} onDelete={() => {}} onPress={() => {}} />
        )}
        // onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default AllTransactionsList
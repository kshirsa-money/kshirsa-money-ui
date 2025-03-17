import { View, Text } from 'react-native'
import React from 'react'
import { addTransactionStyles } from '../../styles/stylesAddTransaction'
import { AntDesign, Entypo } from '@expo/vector-icons'
import Colors from '../../styles/Colors'

const TransactionCategory = () => {
  return (
    <View style={addTransactionStyles.transactionCategoryContainer}>
      <View style={addTransactionStyles.leftSide}>
      <Entypo name="dots-three-horizontal" size={24} color={Colors.white} />
      <View style={addTransactionStyles.categoryTextContainer}>
        <Text style={addTransactionStyles.categoryText}>Category</Text>
        <Text style={addTransactionStyles.categoryName}>Select a category</Text>
      </View>
      </View>
      <View style={addTransactionStyles.rightSide}>
      <AntDesign name="right" size={24} color={Colors.white} />
      </View>
    </View>
  )
}

export default TransactionCategory
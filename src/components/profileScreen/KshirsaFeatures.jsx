import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import kshirsaFeturesStyles from '../../styles/stylesKshirsaFetures'
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons'
import Colors from '../../styles/Colors'
import { useRouter } from 'expo-router'
import uiRoutes from '../../constants/uiRoutes'
import { getDateRanges } from '../../utils/helper'

const KshirsaFeatures = () => {
  const router = useRouter()
  const handleNavigateTransactions = () => {
    router.push({
     pathname: uiRoutes.allTransactions,
    //  params: {
    //     hashTag: 'Hello',
    //     // transactionType: 'EXPENSE, INCOME',
    //     // paymentMode: [],
    //     category: 'Shopping',
    //     transactionBefore: getDateRanges()[2].toDate,
    //     transactionAfter: getDateRanges()[2].fromDate,
    //     dateLabel: 'customDate',
    //     // amountMin: 100,
    //     // amountMax: 400,
    //     sortBy: 'Latest'
    //   }

    })
  }
  const handleNavigateCategories = () => {
    router.push(uiRoutes.categories
    )
  }
  return (
    <View style={kshirsaFeturesStyles.container}>
     <TouchableOpacity style={kshirsaFeturesStyles.card} onPress={() => router.push(uiRoutes.categories)}>
     <MaterialIcons name="category" size={24} color={Colors.secondary} />
        <Text style={kshirsaFeturesStyles.cardTitle}>Categories</Text>
     </TouchableOpacity>
     <TouchableOpacity style={kshirsaFeturesStyles.card} onPress={handleNavigateTransactions}>
     <FontAwesome6 name="money-bill-transfer" size={24} color={Colors.secondary} />
        <Text style={kshirsaFeturesStyles.cardTitle}>Transactions</Text>
     </TouchableOpacity>
    </View>
  )
}

export default KshirsaFeatures

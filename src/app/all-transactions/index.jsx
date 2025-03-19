import { ScrollView, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import KshirsaGeneralHeader from '../../small-components/KshirsaGeneralHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import allTransactionsStyle from '../../styles/stylesAllTransactions'
import AllTransactionsList from '../../components/all-transactions/allTransactionsList'
import { screenHeight } from '../../constants/utils'
import { useDispatch, useSelector } from 'react-redux'
import getAllTransactionsAction from '../../redux/actions/getAllTransactionsAction'

const AllTransactions = () => {
  const allTransactionData = useSelector((state) => state.allTransactionsReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTransactionsAction());
  }
, [dispatch]);

console.log(allTransactionData, 'kingotask')
  return (
    <SafeAreaView style={{ flex: 1 }}>
      // ----------------------------------------------general header ----------------------------------------
      <KshirsaGeneralHeader headerRight={() => {
        return (
          <View style={allTransactionsStyle.headerRight}>
            <Text style={allTransactionsStyle.filterText}>Filter</Text>
          </View>
        )
      }} />
      // -----------------------------------------------all Transactions-------------------------------------------------------
      <ScrollView contentContainerStyle={{ paddingVertical: screenHeight * 0.13, paddingHorizontal: 20 }}>
        <AllTransactionsList allTransactionData={allTransactionData} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default AllTransactions

import { ScrollView, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import KshirsaGeneralHeader from '../../small-components/KshirsaGeneralHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import allTransactionsStyle from '../../styles/stylesAllTransactions'
import AllTransactionsList from '../../components/all-transactions/allTransactionsList'
import { screenHeight } from '../../constants/utils'
import { useDispatch, useSelector } from 'react-redux'
import getAllTransactionsAction from '../../redux/actions/getAllTransactionsAction'
import { usePathname } from 'expo-router'

const AllTransactions = () => {
  const allTransactionData = useSelector((state) => state.allTransactionsReducer);
  const dispatch = useDispatch();
  const pathName = usePathname();
  const [currentPage, setCurrentPage] = useState(1);

  console.log(pathName, 'pathName');
  useEffect(() => {
    dispatch(getAllTransactionsAction({
      pageNumber: currentPage,
      transactionPerPage: 10
    }));
  }
    , [dispatch, currentPage]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <ScrollView contentContainerStyle={{ paddingVertical: screenHeight * 0.13, paddingHorizontal: 20 }}> */}
      // ----------------------------------------------general header ----------------------------------------
      <KshirsaGeneralHeader
        pageTitle='Transactions History'
        headerRight={() => (
          <View style={allTransactionsStyle.headerRight}>
            <Text style={allTransactionsStyle.filterText}>Filter</Text>
          </View>
        )} />
      // -----------------------------------------------all Transactions-------------------------------------------------------
      <AllTransactionsList allTransactionData={allTransactionData} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {/* </ScrollView> */}
    </SafeAreaView>
  )
}

export default AllTransactions

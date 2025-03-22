import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import KshirsaGeneralHeader from '../../small-components/KshirsaGeneralHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import allTransactionsStyle from '../../styles/stylesAllTransactions'
import AllTransactionsList from '../../components/all-transactions/allTransactionsList'
import { screenHeight } from '../../constants/utils'
import { useDispatch, useSelector } from 'react-redux'
import getAllTransactionsAction from '../../redux/actions/getAllTransactionsAction'
import { useLocalSearchParams, usePathname } from 'expo-router'
import { resetGetAllTransactionsAction } from '../../redux/reducers/getAllTransactionsReducer'
import AllTransactionsFilter from '../../components/all-transactions/allTransactionsFilter'
import getAllTransactionsFilterAction from '../../redux/actions/getAllTransactionsFilterAction'
import KshirsaLoadingScreen from '../../small-components/KshirsaLoading'
import recentTransactionStyles from '../../styles/stylesRecentTransaction'
import uiText from '../../constants/uiTexts'
import KshirsaNoDataImage from '../../../assets/animatedImage/noDataImage'
import { getDateRanges } from '../../utils/helper'

const AllTransactions = () => {
  const allTransactionData = useSelector((state) => state.allTransactionsReducer);
  const dispatch = useDispatch();
  const pathName = usePathname();
  const params = useLocalSearchParams();
  const prevParamsRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterVisible, setFilterVisible] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);
  const [filterFormData, setFilterFormData] = useState({
    hashTag: [],
    transactionType: [],
    paymentMode: [],
    category: [],
    transactionBefore: '',
    transactionAfter: '',
    dateLabel: '',
    amountMin: '',
    amountMax: '',
    sortBy: 'Latest'
  });

  useEffect(() => {
    if (JSON.stringify(prevParamsRef.current) !== JSON.stringify(params)) {
      setFilterFormData({
        hashTag: params.hashTag || [],
        transactionType: params.transactionType || [],
        paymentMode: params.paymentMode || [],
        category: params.category || [],
        transactionBefore: params.transactionBefore,
        transactionAfter: params.transactionAfter,
        dateLabel: params.dateLabel,
        amountMin: params.amountMin || '',
        amountMax: params.amountMax || '',
        sortBy: params.sortBy || 'Latest'
      });
      prevParamsRef.current = params;
    }
  }, [params]);

  console.log(pathName, 'pathName');
  console.log(params, 'params');
  console.log(filterFormData, 'filterFormData');
  useEffect(() => {
    dispatch(getAllTransactionsAction({
      pageNumber: currentPage,
      transactionPerPage: 10,
      ...params
    }));
  }, [dispatch, currentPage, refreshPage]);


  // reset the state when the component unmounts
  useEffect(() => {
    dispatch(getAllTransactionsFilterAction());
    return () => {
      setCurrentPage(1);
      dispatch(resetGetAllTransactionsAction());
    }
  }, []);

  const onRefresh = useCallback(() => {
    setCurrentPage(1);
    dispatch(getAllTransactionsAction({
      pageNumber: 1,
      transactionPerPage: 10,
      ...params
    }));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      // ----------------------------------------------general header ----------------------------------------
      <KshirsaGeneralHeader
        pageTitle='Transactions History'
        headerRight={() => (
          <TouchableOpacity style={allTransactionsStyle.headerRight} onPress={() => setFilterVisible(true)}>
            <Text style={allTransactionsStyle.filterText}>Filter</Text>
          </TouchableOpacity>
        )} />

      <AllTransactionsFilter filterVisible={filterVisible} setFilterVisible={setFilterVisible} filterFormData={filterFormData} setFilterFormData={setFilterFormData} />
      // -----------------------------------------------all Transactions-------------------------------------------------------
      {
        allTransactionData.loading ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <KshirsaLoadingScreen />
          </View>
          :
          allTransactionData?.transactionList?.length > 0 ?
            <AllTransactionsList allTransactionData={allTransactionData} currentPage={currentPage} setCurrentPage={setCurrentPage} onRefresh={onRefresh} />
            :
            <View style={allTransactionsStyle.noDataContainer}>
                <KshirsaNoDataImage />
              <Text style={recentTransactionStyles.noDataText}>{uiText.NO_TRANSACTION_FOUND}</Text>
            </View>
      }
    </SafeAreaView>
  )
}

export default AllTransactions

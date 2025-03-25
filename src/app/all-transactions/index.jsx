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
import { countFilters, getDateRanges } from '../../utils/helper'
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons'
import TransactionSortBy from '../../components/all-transactions/transactionSortBy'
import Colors from '../../styles/Colors'

const AllTransactions = () => {
  const allTransactionData = useSelector((state) => state.allTransactionsReducer);
  const dispatch = useDispatch();
  const pathName = usePathname();
  const params = useLocalSearchParams();
  const prevParamsRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterVisible, setFilterVisible] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);
  const [visibleSortPopup, setVisibleSortPopup] = useState(false);
  const [sortByForm, setSortByForm] = useState('Latest');
  const [filterFormData, setFilterFormData] = useState({
    hashTag: '',
    transactionType: '',
    paymentMode: '',
    category: '',
    fromDate: '',
    toDate: '',
    dateLabel: '',
    amountMin: '',
    amountMax: '',
    sortBy: 'Latest'
  });

  const countFilter = countFilters(params);
  console.log(countFilter, 'countFilter');
  useEffect(() => {
    if (params && JSON.stringify(prevParamsRef.current) !== JSON.stringify(params)) {
      console.log('insideIf')
      setSortByForm(params.sortBy || 'Latest');      
      setFilterFormData({
        hashTag: params.hashTag ? (params.hashTag || '')?.split(', ') : [],
        transactionType: params.transactionType ? (params.transactionType || '')?.split(', ') : [],
        paymentMode: params.paymentMode ? (params.paymentMode || '')?.split(', ') : [],
        category: params.category ? (params.category || '')?.split(', ') : [],
        fromDate: params.fromDate,
        toDate: params.toDate,
        dateLabel: params.dateLabel,
        amountMin: params.amountMin || '',
        amountMax: params.amountMax || '',
        sortBy: params.sortBy || 'Latest'
      });
      prevParamsRef.current = params;
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    // const paramsString = JSON.stringify(params);
    // if (prevParamsRef.current !== paramsString) {
      // prevParamsRef.current = paramsString; // Update the reference
      // setCurrentPage(1); // Reset to first page on filter change
  
      dispatch(getAllTransactionsAction({
        pageNumber: currentPage,
        transactionPerPage: 10,
        ...params
      }));
    // }
  }, [dispatch,currentPage, refreshPage, JSON.stringify(params)]);  // ✅ Using stringified params to prevent unnecessary re-renders
  
  console.log(currentPage, 'kingshuk')

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

  const renderFooter = () => {
    return (
      <View style={allTransactionsStyle.sortFilterWrapper}>
        <TouchableOpacity style={allTransactionsStyle.footerBtn} onPress={() => setVisibleSortPopup(true)}>
          {!(sortByForm === 'Latest') && <View style={{backgroundColor:Colors.secondary, height: 10, width: 10, borderRadius: 50}} />}
          <FontAwesome6 name="sort" size={20} color="white" />
          <Text style={allTransactionsStyle.footerText}>SORT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={allTransactionsStyle.footerBtn} onPress={() => setFilterVisible(true)}>
          <FontAwesome5 name="filter" size={20} color="white" />
          <Text style={allTransactionsStyle.footerText}>
            FILTER</Text>
          {countFilter && <Text style={allTransactionsStyle.filterCount}>{countFilter}</Text>}
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      // ----------------------------------------------general header ----------------------------------------
      <KshirsaGeneralHeader
        pageTitle='Transactions History'
      />

      <AllTransactionsFilter filterVisible={filterVisible} setFilterVisible={setFilterVisible} filterFormData={filterFormData} setFilterFormData={setFilterFormData} urlParams={params} sortByForm={sortByForm} />
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
      <TransactionSortBy  visibleSortPopup={visibleSortPopup} setVisibleSortPopup={setVisibleSortPopup} filterParams={params} sortByForm={sortByForm} setSortByForm={setSortByForm} />
      {renderFooter()}
    </SafeAreaView>
  )
}

export default AllTransactions

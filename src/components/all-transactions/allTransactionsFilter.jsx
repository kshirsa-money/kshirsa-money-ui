import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import KshirsaPopup from '../../small-components/KshirsaPopup'
import { defaultamountRange, screenHeight, TransactionTypesToMap } from '../../constants/utils'
import allTransactionFilterStyles from '../../styles/stylesAllTransactionFilter'
import { useSelector } from 'react-redux'
import KshirsaRange from '../../small-components/KshirsaRange'
import KshirsaDropdownWithSearch from '../../small-components/KshirsaDropdownWithSearch'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import Colors from '../../styles/Colors'
import { checkIsModifiedFormData, formatFilterDate, formattedPaymentModes, formatTransactionDate, getDateRanges } from '../../utils/helper'
import KshirsaCalendarAnimation from '../../../assets/animatedImage/KshirsaCalendarAnimation'
import { useNavigation, useRouter } from 'expo-router'
import uiRoutes from '../../constants/uiRoutes'
import DateRangeFilter from './dateRangeFilter'
import { KshirsaAlert } from '../../small-components/KshirsaAlert'
import { Ionicons } from '@expo/vector-icons'

const AllTransactionsFilter = ({ filterVisible, setFilterVisible, filterFormData, setFilterFormData, urlParams, sortByForm }) => {
  const { data: transactionFilterData } = useSelector(state => state.transactionsFilterReducer)
  const router = useRouter()
  const navigation = useNavigation()
  const [minAmount, setMinAmount] = useState(defaultamountRange.MIN)
  const [maxAmount, setMaxAmount] = useState(defaultamountRange.MAX)
  const [formDateRange, setFormDateRange] = useState({
    label: '',
    fromDate: '',
    toDate: ''
  })
  const [selectedTransactionType, setSelectedTransactionType] = useState([])
  const [selectedTransactionCategory, setSelectedTransactionCategory] = useState([])
  const [selectedTransactionTags, setSelectedTransactionTags] = useState([])
  const [customDateRangeOpen, setCustomDateRangeOpen] = useState(false)
  const [initialFilterData, setInitialFilterData] = useState({})
  const [selectedPaymentMode, setSelectedPaymentMode] = useState([])
  const currentFilter = {
    transactionType: selectedTransactionType,
    category: selectedTransactionCategory,
    hashTag: selectedTransactionTags,
    paymentMode: selectedPaymentMode,
    amountMin: minAmount,
    amountMax: maxAmount,
    dateLabel: formDateRange.label || '',
    fromDate: formDateRange.fromDate || '',
    toDate: formDateRange.toDate || ''
  }
  const isFilterChanged = checkIsModifiedFormData(currentFilter, initialFilterData)

  // ...existing code...

  useEffect(() => {
    setSelectedTransactionType(filterFormData.transactionType || '')
    setSelectedTransactionCategory(filterFormData.category || '')
    setSelectedTransactionTags(filterFormData.hashTag || '')
    setMinAmount(filterFormData.amountMin || defaultamountRange.MIN)
    setMaxAmount(filterFormData.amountMax || defaultamountRange.MAX)
    setSelectedPaymentMode(filterFormData.paymentMode || '')
    setFormDateRange({
      label: filterFormData.dateLabel || '',
      fromDate: filterFormData.fromDate ? new Date(filterFormData.fromDate) : '',
      toDate: filterFormData.toDate ? new Date(filterFormData.toDate) : ''
    })
    if (filterVisible) {
      const initialFilter = {
        transactionType: filterFormData.transactionType || '',
        category: filterFormData.category || '',
        hashTag: filterFormData.hashTag || '',
        paymentMode: filterFormData.paymentMode || '',
        amountMin: filterFormData.amountMin || defaultamountRange.MIN,
        amountMax: filterFormData.amountMax || defaultamountRange.MAX,
        dateLabel: filterFormData.dateLabel || '',
        fromDate: filterFormData.fromDate || '',
        toDate: filterFormData.toDate || ''
      }
      setInitialFilterData(initialFilter)
    }
  }, [filterFormData, filterVisible])

  useEffect(() => {
    if (isNaN(formDateRange.fromDate) || isNaN(formDateRange.toDate)) {
      setFormDateRange({
        label: '',
        fromDate: '',
        toDate: ''
      })
    }
  }, [filterFormData, formDateRange])


  const onClose = () => {
    if (isFilterChanged) {
      KshirsaAlert.alert(
        'Discard Changes?',
        'You have unsaved changes. Do you want to discard them?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Discard', onPress: () => setFilterVisible(false) }
        ]
      )
    } else {
      setFilterVisible(false)
    }
  }
  const handleTransactionTypeSelection = (type) => {
    setSelectedTransactionType(prevSelected => {
      if (prevSelected.includes(type)) {
        return prevSelected.filter(i => i !== type)
      } else {
        return [...prevSelected, type]
      }
    })
  }

  const handleApplyFilter = () => {
    const params = {
      hashTag: selectedTransactionTags?.length ? selectedTransactionTags.join(", ") : null,
      transactionType: selectedTransactionType?.length ? selectedTransactionType.join(", ") : null,
      category: selectedTransactionCategory?.length ? selectedTransactionCategory.join(", ") : null,
      paymentMode: selectedPaymentMode?.length ? selectedPaymentMode.join(", ") : null,
      fromDate: formDateRange?.fromDate ? new Date(formDateRange.fromDate).toISOString() : null,
      toDate: formDateRange?.toDate ? new Date(formDateRange.toDate).toISOString() : null,
      dateLabel: formDateRange?.label || null,
      amountMax: maxAmount !== defaultamountRange.MAX ? maxAmount : null,
      amountMin: minAmount !== defaultamountRange.MIN ? minAmount : null,
      sortBy: sortByForm || "Latest",
    };
  
    const filteredParams = Object.fromEntries(Object.entries(params).filter(([_, value]) => value !== null));
  
    console.log(filteredParams, "Final filteredParams");
    setFilterVisible(false);
    router.replace({
      pathname: uiRoutes.allTransactions,
      params: filteredParams,
    })
  };
  
  
  
  



  const handleReset = () => {
    setSelectedTransactionType([])
    setSelectedTransactionCategory([])
    setSelectedTransactionTags([])
    setSelectedPaymentMode([])
    setMinAmount(defaultamountRange.MIN)
    setMaxAmount(defaultamountRange.MAX)
    setFormDateRange({
      label: '',
      fromDate: '',
      toDate: ''
    })
  }

  const renderFooter = () => (
    <View style={allTransactionFilterStyles.footer}>
      <TouchableOpacity style={allTransactionFilterStyles.clearBtn} onPress={onClose}>
        <Text style={allTransactionFilterStyles.clearText}>Close</Text>
      </TouchableOpacity>
      <TouchableOpacity style={allTransactionFilterStyles.applyBtn} onPress={handleApplyFilter}>
        <Text style={allTransactionFilterStyles.applyText}>Apply</Text>
      </TouchableOpacity>
    </View>
  )

  const renderRightHeader = () => (
    <TouchableOpacity style={allTransactionFilterStyles.resetBtn} onPress={handleReset}>
      <Ionicons name="refresh-outline" size={20} color="black" />
      <Text style={allTransactionFilterStyles.resetTxt} >Reset Filter</Text>
    </TouchableOpacity>
  )
  return (
    <KshirsaPopup visible={filterVisible} onClose={onClose} header="Transaction Filter" popupHeight={screenHeight} footer={renderFooter()} isChildPopupOpen={customDateRangeOpen} transactionFilterPopup headerRight={renderRightHeader()}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ gap: 25, paddingBottom: 100 }}>
          {/* date range */}
          <DateRangeFilter formDateRange={formDateRange} setFormDateRange={setFormDateRange} customDateRangeOpen={customDateRangeOpen} setCustomDateRangeOpen={setCustomDateRangeOpen} />
          {/* transaction types */}
          <View style={allTransactionFilterStyles.transactionTypeWrapper}>
            <Text style={allTransactionFilterStyles.transactionText}>Transaction Type</Text>
            <View style={allTransactionFilterStyles.transactionType}>
              {TransactionTypesToMap.map((type, index) => (
                <TouchableOpacity key={index} style={[allTransactionFilterStyles.transactionTypeMap, selectedTransactionType.includes(type) && allTransactionFilterStyles.selectedTransactionType]} onPress={() => handleTransactionTypeSelection(type)}>
                  <Text style={selectedTransactionType.includes(type) ? allTransactionFilterStyles.transactionTypeTextSelected : allTransactionFilterStyles.transactionTypeText}>{type?.toLowerCase()}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {/* transaction category  */}
          <View style={allTransactionFilterStyles.transactionTypeWrapper}>
            <View style={allTransactionFilterStyles.transactionType}>
              <KshirsaDropdownWithSearch
                name='Transaction Category'
                data={transactionFilterData?.categories || []}
                selectedItems={selectedTransactionCategory}
                setSelectedItems={setSelectedTransactionCategory}
              />
            </View>
          </View>
          {/* transaction payment mode */}
          <View style={allTransactionFilterStyles.transactionTypeWrapper}>
            <View style={allTransactionFilterStyles.transactionType}>
              <KshirsaDropdownWithSearch
                name='Payment Mode'
                data={transactionFilterData?.paymentModes}
                selectedItems={selectedPaymentMode}
                setSelectedItems={setSelectedPaymentMode}
                isPaymentMode
              />
            </View>
          </View>
          {/* transaction amount range */}
          <View style={allTransactionFilterStyles.transactionTypeWrapper}>
            <Text style={allTransactionFilterStyles.transactionText}>Transaction Amount</Text>
            <View style={{ flexDirection: 'column', gap: 20, paddingRight: 80, paddingLeft: 20, paddingTop: 20 }}>
              <View style={{ flexDirection: 'row', gap: 20 }}>
                <Text style={allTransactionFilterStyles.transactionTypeText}>₹{minAmount} - ₹{maxAmount}</Text>
              </View>
              <View style={{ flex: 1, width: 200 }}>
                <KshirsaRange
                  min={defaultamountRange.MIN}
                  max={defaultamountRange.MAX}
                  fromValue={minAmount}
                  toValue={maxAmount}
                  setFromValue={setMinAmount}
                  setToValue={setMaxAmount}
                  width='200'
                />
              </View>
            </View>
          </View>
          {/* transaction tags */}
          <View style={allTransactionFilterStyles.transactionTypeWrapper}>
            <View style={allTransactionFilterStyles.transactionType}>
              <KshirsaDropdownWithSearch
                name='Transaction Tags'
                data={transactionFilterData?.hashtags || []}
                selectedItems={selectedTransactionTags}
                setSelectedItems={setSelectedTransactionTags}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KshirsaPopup>
  )
}

export default AllTransactionsFilter
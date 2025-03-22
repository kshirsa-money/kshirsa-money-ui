import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import KshirsaPopup from '../../small-components/KshirsaPopup'
import { screenHeight, TransactionTypesToMap } from '../../constants/utils'
import allTransactionFilterStyles from '../../styles/stylesAllTransactionFilter'
import { useSelector } from 'react-redux'
import KshirsaRange from '../../small-components/KshirsaRange'
import KshirsaDropdownWithSearch from '../../small-components/KshirsaDropdownWithSearch'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import Colors from '../../styles/Colors'
import { formatFilterDate, formatTransactionDate, getDateRanges } from '../../utils/helper'
import KshirsaCalendarAnimation from '../../../assets/animatedImage/KshirsaCalendarAnimation'
import { useRouter } from 'expo-router'
import uiRoutes from '../../constants/uiRoutes'
import DateRangeFilter from './dateRangeFilter'

const AllTransactionsFilter = ({ filterVisible, setFilterVisible, filterFormData, setFilterFormData }) => {
  const { data: transactionFilterData } = useSelector(state => state.transactionsFilterReducer)
  const router = useRouter()
  const [fromValue, setFromValue] = useState(0)
  const [toValue, setToValue] = useState(200)
  const [formDateRange, setFormDateRange] = useState({
    label: '',
    fromDate: '',
    toDate: ''
  })

  const [selectedTransactionType, setSelectedTransactionType] = useState([])
  const [selectedTransactionCategory, setSelectedTransactionCategory] = useState([])
  const [selectedTransactionTags, setSelectedTransactionTags] = useState([])
  const [customDateRangeOpen, setCustomDateRangeOpen] = useState(false)


  useEffect(() => {
    setSelectedTransactionType(filterFormData.transactionType.length > 0 ? filterFormData.transactionType?.split(', ') : [])
    setSelectedTransactionCategory(filterFormData.category.length > 0 ? filterFormData.category?.split(', ') : [])
    setSelectedTransactionTags(filterFormData.hashTag.length > 0 ? filterFormData.hashTag?.split(', ') : [])
    setFromValue(filterFormData.amountMin || 0)
    setToValue(filterFormData.amountMax || 200)
    setFormDateRange({
      label: filterFormData.dateLabel,
      fromDate: filterFormData.transactionAfter,
      toDate: filterFormData.transactionBefore
    })
  }, [filterFormData]
  )
  const onClose = () => {
    setFilterVisible(false)
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
    setFilterVisible(false)
    const params = {
      hashTag: selectedTransactionTags?.join(', ') || '',
      transactionType: selectedTransactionType?.join(', ') || '',
      category: selectedTransactionCategory?.join(', ') || '',
      transactionAfter: formDateRange.fromDate ? new Date(formDateRange.fromDate).toISOString() : '',
      transactionBefore: formDateRange.toDate ? new Date(formDateRange.toDate).toISOString() : '',
      dateLabel: formDateRange.label,
      amountMin: fromValue,
      amountMax: toValue,
      sortBy: 'Latest'
    }
  
    // Filter out empty values
    const filteredParams = Object.fromEntries(Object.entries(params).filter(([_, value]) => value))
  
    router.replace({
      pathname: uiRoutes.allTransactions,
      params: filteredParams
    })
  }

  const renderFooter = () => (
    <View style={allTransactionFilterStyles.footer}>
      <TouchableOpacity style={allTransactionFilterStyles.clearBtn}>
        <Text style={allTransactionFilterStyles.clearText}>Clear</Text>
      </TouchableOpacity>
      <TouchableOpacity style={allTransactionFilterStyles.applyBtn} onPress={handleApplyFilter}>
        <Text style={allTransactionFilterStyles.applyText}>Apply</Text>
      </TouchableOpacity>
    </View>
  )
  return (
    <KshirsaPopup visible={filterVisible} onClose={onClose} header="Transaction Filter" popupHeight={screenHeight} footer={renderFooter()} isChildPopupOpen={customDateRangeOpen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ gap: 40, paddingBottom: 100 }}>
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
          {/* transaction Categories
          <View style={allTransactionFilterStyles.transactionTypeWrapper}>
            <Text style={allTransactionFilterStyles.transactionText}>Transaction Category</Text>
            <ScrollView contentContainerStyle={allTransactionFilterStyles.transactionType} horizontal>
              {transactionFilterData?.categories?.map((type, index) => (
                <TouchableOpacity key={index} style={allTransactionFilterStyles.transactionTypeMap}>
                  <Text style={allTransactionFilterStyles.transactionText}>{type?.toLowerCase()}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View> */}
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
          {/* transaction amount range */}
          <View style={allTransactionFilterStyles.transactionTypeWrapper}>
            <Text style={allTransactionFilterStyles.transactionText}>Transaction Amount</Text>
            <View style={{ flexDirection: 'column', gap: 20, paddingRight: 80, paddingLeft: 20, paddingTop: 20 }}>
              <View style={{ flexDirection: 'row', gap: 20 }}>
                <Text style={allTransactionFilterStyles.transactionTypeText}>₹{fromValue} - ₹{toValue}</Text>
              </View>
              <View style={{ flex: 1, width: 200 }}>
                <KshirsaRange
                  min={0}
                  max={200}
                  fromValue={fromValue}
                  toValue={toValue}
                  setFromValue={setFromValue}
                  setToValue={setToValue}
                  width='200'
                />
              </View>
            </View>
          </View>
          <DateRangeFilter formDateRange={formDateRange} setFormDateRange={setFormDateRange} customDateRangeOpen={customDateRangeOpen} setCustomDateRangeOpen={setCustomDateRangeOpen} />
          {/* transaction tags 
           <View style={allTransactionFilterStyles.transactionTypeWrapper}>
            <View style={allTransactionFilterStyles.transactionType}>
              <KshirsaDropdownWithSearch name='Transaction Tags' data={transactionFilterData?.hashtags} />
            </View>
          </View> */}
        </View>
      </ScrollView>
    </KshirsaPopup>
  )
}

export default AllTransactionsFilter
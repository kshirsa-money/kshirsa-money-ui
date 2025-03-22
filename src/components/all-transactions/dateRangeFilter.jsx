import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import allTransactionFilterStyles from '../../styles/stylesAllTransactionFilter'
import KshirsaCalendarAnimation from '../../../assets/animatedImage/KshirsaCalendarAnimation'
import { formatFilterDate, getDateRanges } from '../../utils/helper'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import Colors from '../../styles/Colors'
import KshirsaPopup from '../../small-components/KshirsaPopup'

const DateRangeFilter = ({ formDateRange, setFormDateRange, customDateRangeOpen, setCustomDateRangeOpen }) => {
    const [showFromDatePicker, setShowFromDatePicker] = useState(false)
    const [showToDatePicker, setshowToDatePicker] = useState(false)
    // console.log(formDateRange.fromDate.toDateString(), formDateRange.toDate.toDateString(), ' fdates')

    const handleDateRangeChange = (dateRange) => {
        setFormDateRange((prev => ({
            ...prev,
            label: dateRange.label,
            fromDate: new Date(dateRange.fromDate),
            toDate: new Date(dateRange.toDate)
        })))
    }
    useEffect(() => {
        // if(formDateRange.label === 'customDate') setCustomDateRangeOpen(true)
        if (!formDateRange.label && customDateRangeOpen) {
            const dateRanges = getDateRanges()
            setFormDateRange((prev => ({
                ...prev,
                label: dateRanges[2].label,
                fromDate: new Date(dateRanges[2].fromDate),
                toDate: new Date(dateRanges[2].toDate)
            })))
        }
    }, [formDateRange.label, customDateRangeOpen])

    const handleDateChange = (event, selectedDate) => {
        setShowFromDatePicker(false);
        setshowToDatePicker(false)
        setFormDateRange((prev) => ({ ...prev, label: 'customDate' }))
        if (selectedDate) {
            if (showFromDatePicker) setFormDateRange((prev) => ({ ...prev, fromDate: selectedDate }))
            else setFormDateRange((prev) => ({ ...prev, toDate: selectedDate }))
        }
    };

    const handleYearMonthClick = () => {
        setCustomDateRangeOpen(false)
        setFormDateRange((prev => ({
            ...prev,
            label: '',
            fromDate: '',
            toDate: ''
        })))
    }
    console.log(formDateRange, 'formDateRange')
    return (
        <>
            <View style={allTransactionFilterStyles.dateRangeBtnWrapper}>
                <TouchableOpacity style={[allTransactionFilterStyles.dateRangeBtn, !customDateRangeOpen && allTransactionFilterStyles.selectedDateRange]} onPress={handleYearMonthClick}>
                    <Text style={[allTransactionFilterStyles.dateRangeText, !customDateRangeOpen && allTransactionFilterStyles.selectedDateRangeText]}>Year/Month</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[allTransactionFilterStyles.dateRangeBtn, customDateRangeOpen && allTransactionFilterStyles.selectedDateRange]} onPress={() => setCustomDateRangeOpen(true)}>
                    <Text style={[allTransactionFilterStyles.dateRangeText, customDateRangeOpen && allTransactionFilterStyles.selectedDateRangeText]}>Custom Range</Text>
                </TouchableOpacity>
            </View>
            {/*--------------------------- date range----------------------- */}
            {!customDateRangeOpen &&
                <View style={allTransactionFilterStyles.yearMonthWrapper}>
                    {getDateRanges().map((dateRange, index) => (
                        <TouchableOpacity key={index} style={[allTransactionFilterStyles.yearMonthBtn, formDateRange.label === dateRange.label && allTransactionFilterStyles.selectedYearMonth]} onPress={() => handleDateRangeChange(dateRange)}>
                            <Text style={[allTransactionFilterStyles.yearMonthText, formDateRange.label === dateRange.label && allTransactionFilterStyles.selectedYearMonthText]}>{dateRange.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>}
            <KshirsaPopup visible={customDateRangeOpen} onClose={() => setCustomDateRangeOpen(false)} header="Custom Date Range" popupHeight={300} additionalZindex={1} isSecondaryDesign={true}>
                <View style={allTransactionFilterStyles.dateRangeWrapper}>
                    {/* ------------------------------from date--------------- */}
                    <View style={allTransactionFilterStyles.dateWrapper}>
                        <Text style={allTransactionFilterStyles.transactionText}>Date (From)</Text>
                        <TouchableOpacity onPress={() => setShowFromDatePicker(true)} style={allTransactionFilterStyles.dateBtn}>
                            <Text style={allTransactionFilterStyles.dateText}>{formatFilterDate(formDateRange.fromDate)}</Text>
                            <KshirsaCalendarAnimation />
                        </TouchableOpacity>
                    </View>
                    <View style={allTransactionFilterStyles.dateWrapper}>
                        <Text style={allTransactionFilterStyles.transactionText}>Date (To)</Text>
                        <TouchableOpacity onPress={() => setshowToDatePicker(true)} style={allTransactionFilterStyles.dateBtn}>
                            <Text style={allTransactionFilterStyles.dateText}>{formatFilterDate(formDateRange.toDate)}</Text>
                            <KshirsaCalendarAnimation />
                        </TouchableOpacity>
                    </View>
                </View>
            </KshirsaPopup>
            {(showFromDatePicker || showToDatePicker) &&
                <RNDateTimePicker
                    value={showFromDatePicker ? new Date(formDateRange.fromDate) : new Date(formDateRange.toDate)}
                    mode="date"
                    onChange={handleDateChange}
                    display="spinner"
                    positiveButton={{ label: 'OK', textColor: Colors.secondary }}
                    negativeButton={{ label: 'Cancel', textColor: Colors.lightGrey }}
                />}
        </>
    )
}

export default DateRangeFilter
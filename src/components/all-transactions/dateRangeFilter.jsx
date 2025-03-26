import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useCallback } from 'react'
import allTransactionFilterStyles from '../../styles/stylesAllTransactionFilter'
import KshirsaCalendarAnimation from '../../../assets/animatedImage/KshirsaCalendarAnimation'
import { formatFilterDate, getDateRanges } from '../../utils/helper'
import { DatePickerModal } from 'react-native-paper-dates'

const DateRangeFilter = ({ formDateRange, setFormDateRange, customDateRangeOpen, setCustomDateRangeOpen }) => {
    const isCustomDateRange = formDateRange.label === 'customDate'

    const handleYearMonthSelect = (dateRange) => {
        if (dateRange.label === formDateRange.label) {
            setFormDateRange((prev => ({
                ...prev,
                label: '',
                fromDate: '',
                toDate: ''
            })))
        } else {
            setFormDateRange((prev => ({
                ...prev,
                label: dateRange.label,
                fromDate: new Date(dateRange.fromDate),
                toDate: new Date(dateRange.toDate)
            })))
        }
    }
    
    const handleYearMonthClick = () => {
        if (isCustomDateRange) {
            setFormDateRange((prev => ({
                ...prev,
                label: '',
                fromDate: '',
                toDate: ''
            })))
        }
        setCustomDateRangeOpen(false)
    }

    const handleCustomRangeClick = () => {
        if (!isCustomDateRange) {
            // setFormDateRange((prev => ({
            //     ...prev,
            //     fromDate: '',
            //     toDate: '',
            //     dateLabel: ''
            // })))
            setCustomDateRangeOpen(true)
        }
    }

    const onDismiss = useCallback(() => {
        setCustomDateRangeOpen(false);
    }, [])

    const onConfirm = useCallback(
        ({ startDate, endDate }) => {
            setCustomDateRangeOpen(false)
            setFormDateRange((prev) => ({ ...prev, label: 'customDate', fromDate: startDate, toDate: endDate }));
        },
        []
    );

    return (
        <>
            <View style={allTransactionFilterStyles.dateRangeBtnWrapper}>
                <TouchableOpacity style={[allTransactionFilterStyles.dateRangeBtn, !isCustomDateRange && allTransactionFilterStyles.selectedDateRange]} onPress={handleYearMonthClick}>
                    <Text style={[allTransactionFilterStyles.dateRangeText, !isCustomDateRange && allTransactionFilterStyles.selectedDateRangeText]}>Year/Month</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[allTransactionFilterStyles.dateRangeBtn, isCustomDateRange && allTransactionFilterStyles.selectedDateRange]} onPress={handleCustomRangeClick}>
                    <Text style={[allTransactionFilterStyles.dateRangeText, isCustomDateRange && allTransactionFilterStyles.selectedDateRangeText]}>Custom Range</Text>
                </TouchableOpacity>
            </View>
            {(!isCustomDateRange) ?
                <View style={allTransactionFilterStyles.yearMonthWrapper}>
                    {getDateRanges().map((dateRange, index) => (
                        <TouchableOpacity key={index} style={[allTransactionFilterStyles.yearMonthBtn, formDateRange.label === dateRange.label && allTransactionFilterStyles.selectedYearMonth]} onPress={() => handleYearMonthSelect(dateRange)}>
                            <Text style={[allTransactionFilterStyles.yearMonthText, formDateRange.label === dateRange.label && allTransactionFilterStyles.selectedYearMonthText]}>{dateRange.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View> :
                <View style={allTransactionFilterStyles.dateRangeWrapper}>
                    <View style={allTransactionFilterStyles.dateWrapper}>
                        <TouchableOpacity onPress={() => setCustomDateRangeOpen(true)} style={allTransactionFilterStyles.dateBtn}>
                            <KshirsaCalendarAnimation />
                            <Text style={allTransactionFilterStyles.dateText}>{`${formatFilterDate(formDateRange.fromDate)} - ${formatFilterDate(formDateRange.toDate)}`}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
            <View style={allTransactionFilterStyles.dateRangeWrapper}>
                <DatePickerModal
                    locale='en'
                    mode="range"
                    visible={customDateRangeOpen}
                    onDismiss={onDismiss}
                    onConfirm={onConfirm}
                    startDate={formDateRange.fromDate}
                    endDate={formDateRange.toDate}
                    allowEditing={false}
                    calendarIcon='hello world'
                    dateMode='end'
                    ScrollModeType='horizontal'
                    presentationStyle='pageSheet'
                    withDateFormatInLabel={false}
                    label="Select date range"
                    startLabel="From"
                    endLabel="To"
                    animationType="slide"
                    disableStatusBar={false}
                />
            </View>
        </>
    )
}

export default DateRangeFilter
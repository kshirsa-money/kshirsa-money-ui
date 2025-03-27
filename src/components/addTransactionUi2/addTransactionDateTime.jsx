import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import moment from 'moment'
import addTransactionStyles2 from '../../styles/stylesAddTransaction2'
import KshirsaAnimatedClock from '../../../assets/animatedImage/KshirsaAnimatedClock'
import  DateTimePicker from '@react-native-community/datetimepicker'
import Colors from '../../styles/Colors'

const AddTransactionDateTime = ({ formData, setFormData, handleInputChange }) => {
    const [dateTime, setDateTime] = useState(
        formData?.transactionTime ? new Date(formData?.transactionTime) : new Date()
    );
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);

    useEffect(() => {
        if (!formData?.transactionTime) {
            setFormData((prev) => ({
                ...prev,
                transactionTime: dateTime,
            }));
        }
    }, [dateTime]);

    useEffect(() => {
        const newDate = new Date(formData.transactionTime);
        if (newDate.getTime() !== dateTime.getTime()) {
            setDateTime(newDate);
        }
    }, [formData.transactionTime]);

    // Formatting Date and Time using moment.js
    const formattedDate = useMemo(() => moment(dateTime)?.format("YYYY-MM-DD"), [dateTime]);
    const displayDate = useMemo(() => moment(dateTime)?.calendar(null, {
        sameDay: '[Today]',
        lastDay: '[Yesterday]',
        lastWeek: 'dddd, MMM D',
        sameElse: 'MMM D, YYYY',
    }), [dateTime]);
    const formattedTime = useMemo(() => moment(dateTime)?.format("hh:mm A"), [dateTime]);

    const handleDateChange = (event, selectedDate) => {
        setShowDateTimePicker(false);
        if (selectedDate) {
          setDateTime(selectedDate);
            setFormData((prev) => ({
                ...prev,
                transactionTime: selectedDate,
            }));
        }
      };
      const handleRecurring = () => {
        setFormData((prev) => ({
            ...prev,
            isRecurring: !formData.isRecurring,
        }));
    };
    
    return (
        <>
        <View style={addTransactionStyles2.transactionDateTimeContainer}>
            <TouchableOpacity style={addTransactionStyles2.calendarContainer} onPress={() => setShowDateTimePicker(true)}>
                <KshirsaAnimatedClock />
                <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center',gap: 10}}>
                <Text style={addTransactionStyles2.date}>{displayDate || ''}</Text>
                <Text style={addTransactionStyles2.date}>{formattedTime || ''}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={[addTransactionStyles2.RecurringBtn, formData.isRecurring && {backgroundColor:Colors.secondary}]}  onPress={handleRecurring}>
                <Text style={[addTransactionStyles2.recurringTxt, formData.isRecurring && {color:Colors.moodyBlack}]}>Recurring</Text>
                <Text style={[addTransactionStyles2.isRecurring, formData.isRecurring && {color:Colors.moodyBlack}]}>{formData?.isRecurring ? 'On' : 'Off'}</Text>
            </TouchableOpacity>
        </View>
        {showDateTimePicker && (
         <DateTimePicker
         value={dateTime}
         mode="date"
         onChange={handleDateChange}
         maximumDate={new Date()}
         display="spinner"
         positiveButton={{label: 'OK', textColor: Colors.secondary}}
         negativeButton={{label: 'Cancel', textColor: Colors.lightGrey}}
       />
    )}
        </>
    );
}

export default AddTransactionDateTime;

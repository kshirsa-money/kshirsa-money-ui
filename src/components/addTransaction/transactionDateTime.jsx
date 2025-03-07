import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { addTransactionStyles } from '../../styles/stylesAddTransaction'
import { AntDesign } from '@expo/vector-icons'
import Colors from '../../styles/Colors'
import  DateTimePicker from '@react-native-community/datetimepicker'
import { formatDate, formatTime, formatTransactionDate, getCombinedDateTime, getCombinedDateTimeString } from '../../utils/helper'

const TransactionDateTime = ({ formData, onChange, setFormData }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const combinedDateTime = getCombinedDateTime(date, time);
    setFormData((prev) => ({
      ...prev,
      transactionTime: combinedDateTime,
    }));
    
  }, [date, time]);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };
  console.log(time, 'date')
  return (
    <>
    <View style={addTransactionStyles.transactionDateTimeContainer}>
        <TouchableOpacity style={addTransactionStyles.calendarContainer} onPress={() => setShowDatePicker(true)}>
            <View style={addTransactionStyles.calendarIcon}>
            <AntDesign name="calendar" size={24} color={Colors.white} />
            </View>
            <Text style={addTransactionStyles.date}>{formatTransactionDate(date)}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={addTransactionStyles.timeContainer} onPress={() => setShowTimePicker(true)}>
            <Text style={addTransactionStyles.time}>{formatTime(time)}</Text>
        </TouchableOpacity>
    </View>
    {showDatePicker && (
         <DateTimePicker
         value={date}
         mode="date"
         onChange={handleDateChange}
         maximumDate={new Date()}
         display="spinner"
       />
    )}
    {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          onChange={handleTimeChange}
          display="spinner"
        />
      )}
    </>
  )
}

export default TransactionDateTime
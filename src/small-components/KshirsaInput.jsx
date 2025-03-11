import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import kshirsaButtonStyles from '../styles/stylesKshirsaInput';
import Colors from '../styles/Colors';
import { Fontisto, Ionicons, AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';
import { formatDate } from '../utils/helper';

const KshirsaInput = ({
  value = '',
  errorMessage = 'no error',
  style = '',
  isValid = false,
  needErrorMsg = true,
  needSuccessSymbol = false,
  placeholder = 'Enter your input',
  needErrorStyle = false,
  name= '',
  onChangeText = () => {},
  type = 'text', 
  icon = null,
  onKeyPress = () => {},
  onSubmitEditing = () => {},
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false); // State to control date picker visibility
  const [date, setDate] = useState(new Date()); // State to store selected date

  const success = isValid && needSuccessSymbol;
  const focusWithNotSuccess = !isValid && isFocused;
  const errorStyles = needErrorStyle && !isFocused;
  const labelColor = success
    ? Colors.secondary
    : focusWithNotSuccess
    ? Colors.infoBlue
    : errorStyles
    ? Colors.red
    : Colors.white;

  // Icon mapping based on input type
  const getIcon = () => {
    switch (type) {
      case 'email':
        return <Fontisto name="email" size={24} color={labelColor} />;
      case 'name':
        return <Ionicons name="person" size={24} color={labelColor} />;
      case 'dob':
        return <MaterialIcons name="calendar-today" size={24} color={labelColor} />;
      case 'phone':
        return <Feather name="phone-call" size={24} color={labelColor} />;
      default:
        return icon;
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
      onChangeText(formatDate(selectedDate));
    }
  };

  return (
    <View>
      <View
        style={[
          kshirsaButtonStyles.container,
          kshirsaButtonStyles.normalInputWrapper,
          style,
          errorStyles && kshirsaButtonStyles.errorInputWrapper,
        ]}
      >
        <View style={kshirsaButtonStyles.LablelWrapper}>{getIcon()}</View>
        {type === 'dob' ? (
          <TouchableOpacity
            style={[kshirsaButtonStyles.input, kshirsaButtonStyles.dateInput]}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={{ color: Colors.white }}>
              {value || placeholder}
            </Text>
          </TouchableOpacity>
        ) : (
          <TextInput
            style={[
              kshirsaButtonStyles.input,
              success ? kshirsaButtonStyles.successInput : kshirsaButtonStyles.normalInput,
            ]}
            placeholder={placeholder}
            placeholderTextColor={Colors.white}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={value}
            onChangeText={onChangeText}
            keyboardType={type === 'phone' ? 'phone-pad' : 'default'}
            name={name}
            maxLength={type === 'phone' ? 10 : 100}
            onKeyPress={onKeyPress}
            onSubmitEditing={onSubmitEditing}
          />
        )}
        <View style={kshirsaButtonStyles.checkWrapper}>
          {success && <Ionicons name="checkmark-done" size={24} color={Colors.secondary} />}
        </View>
      </View>
      {!isValid && needErrorMsg && <Text style={kshirsaButtonStyles.errorText}>{errorMessage}</Text>}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          onChange={handleDateChange}
          maximumDate={new Date()}
          display="spinner"
        />
      )}
    </View>
  );
};

export default KshirsaInput;

import { View, TextInput, Animated, Text } from 'react-native'
import React, { useState, useRef } from 'react'
import addTransactionStyles2 from '../../styles/stylesAddTransaction2'
import Colors from '../../styles/Colors'
import { MaterialIcons } from '@expo/vector-icons'

const AddTransactionAmount = ({ formData, setFormData, handleInputChange, errors }) => {
    const [isFocused, setIsFocused] = useState(false);
    const backgroundColorAnim = useRef(new Animated.Value(0)).current;

    const handleFocus = () => {
        setIsFocused(true);
        Animated.timing(backgroundColorAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const handleBlur = () => {
        setIsFocused(false);
        Animated.timing(backgroundColorAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const animatedBackgroundColor = backgroundColorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [Colors.generalFocusBg, Colors.secondary],
    });

    return (
        <Animated.View style={[addTransactionStyles2.amountMainContainer]}>
            <View style={[addTransactionStyles2.amountContainer]}>
                <MaterialIcons name="currency-rupee" size={30} color={Colors.secondary} />
                <TextInput
                    placeholder='0.00'
                    keyboardType='phone-pad'
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChangeText={(text) => handleInputChange('amount', text)}
                    value={formData.amount}
                    style={[addTransactionStyles2.amountInput]}
                    placeholderTextColor={Colors.white}
                    maxLength={10}
                />
            </View>
                <Text style={{color: Colors.red, alignSelf: 'center'}}>{errors}</Text>
            <Animated.View
                style={{
                    height: 4,
                    marginHorizontal: 20,
                    backgroundColor: animatedBackgroundColor,
                    borderRadius: 10,
                }}
            />
        </Animated.View>
    );
};

export default AddTransactionAmount;
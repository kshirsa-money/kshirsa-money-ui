import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import kshirsaButtonStyles from '../styles/StylesKshirsaButton'
import cssUtils from '../constants/cssUtils'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../styles/Colors'

const KshirsaButton = ({ title = 'button', buttonStyle, titleStyle, onPress, icon=null, disabled = false }) => {
    return (
        <TouchableOpacity  onPress={onPress} activeOpacity={disabled ? 1 : cssUtils.buttonOpacity}
        disabled={disabled}
        >
            <LinearGradient colors={disabled ? Colors.disabledButtonLinearGradient : Colors.buttonLinearGradient} style={[icon? kshirsaButtonStyles.iconContainer : kshirsaButtonStyles.container, buttonStyle]}>
               {icon ? icon : <Text style={[kshirsaButtonStyles.text, titleStyle]}>{title}</Text>}
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default KshirsaButton


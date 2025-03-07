import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import KshirsaPopup from '../../small-components/KshirsaPopup'
import paymentModeOptions from '../../constants/paymentModeOptions'
import { addTransactionStyles } from '../../styles/stylesAddTransaction'

const TransactionPaymentModePopup = ({ visiblePaymentModePopup, setVisiblePaymentModePopup, setSelectedPaymentMode, setFormData }) => {
  return (
    <KshirsaPopup
      visible={visiblePaymentModePopup}
      onClose={() => setVisiblePaymentModePopup(false)}
      header="Select Payment Mode"
    >
      <View style={addTransactionStyles.paymentModeOptionsContainer}>
      {paymentModeOptions.map((option) => (
        <TouchableOpacity
          key={option?.label}
          style={addTransactionStyles.paymentModeOption}
          onPress={() => {
            setSelectedPaymentMode(option)
            setVisiblePaymentModePopup(false)
            setFormData((prev) => ({
              ...prev,
              paymentMode: option.value,
            }))
          }}
        >
          <Text style={addTransactionStyles.paymentOptionLabel}>{option?.label}</Text>
          {option?.icon}
        </TouchableOpacity>
      ))
      }
      </View>
    </KshirsaPopup>
  )
}

export default TransactionPaymentModePopup
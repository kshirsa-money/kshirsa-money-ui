import React from "react";
import { Modal, View, TouchableOpacity, Text } from "react-native";
import Calculator from "react-native-calculator";

const CalculatorModal = ({ visible, onClose, onCalculate }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            padding: 10,
            margin: 20,
          }}
        >
          {/* Close Button */}
          <TouchableOpacity onPress={onClose} style={{ alignSelf: "flex-end" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>✕</Text>
          </TouchableOpacity>

          {/* Calculator Component */}
          <Calculator
            onCalc={(result) => {
              onCalculate(result.toString()); // Pass calculated amount
              onClose(); // Close modal
            }}
            style={{ height: 400 }}
            hideDisplay={false}
            hideClearButton={false}
            hidePlusMinusButton={false}
            hideDecimal={false}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CalculatorModal;

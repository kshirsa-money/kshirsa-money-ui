import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { addTransactionStyles } from '../../styles/stylesAddTransaction';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../styles/Colors';
import { TextInput } from 'react-native';
import cssUtils from '../../constants/cssUtils';
import KshirsaPopup from '../../small-components/KshirsaPopup';
import TransactionPaymentModePopup from './transactionPaymentModePopup';
import CashIcon from '../../../assets/icons/cashIcon';
import UpiIcon from '../../../assets/icons/upiIcon';
import paymentModeOptions from '../../constants/paymentModeOptions';
import CategoriesPopup from '../category/categoriesPopup';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

const TransactionCard = ({ formData, onChange, setFormData, editTransaction, handleNavigateToCategories }) => {
  const [visiblePaymenetModePopup, setVisiblePaymentModePopup] = useState(false);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState(paymentModeOptions[0]);
  const [visibleCategoryPopup, setVisibleCategoryPopup] = useState(false);
  const { loading, data: categoryData, success } = useSelector((state) => state.viewCategoriesReducer)

  const handleTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      transactionType: type,
    }));
  };

  const rupeesIconAndAmountFontSize = () => {
    const length = formData.amount.length;
    if (length >= 0 && length <= 5) {
      return cssUtils.bigTextSize;
    } else {
      return cssUtils.mediumTextSize;
    }
  };

  useEffect(() => {
    if (formData?.paymentMode) {
      const selectedPaymentMode = paymentModeOptions.find((option) => option.value === formData.paymentMode);
      setSelectedPaymentMode(selectedPaymentMode);
    }
  }, [formData]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      categoryName: categoryData?.[formData.transactionType]?.[0]?.category?.categoryName,
      categoryId: categoryData?.[formData.transactionType]?.[0]?.category?.categoryId,
    }));
  }, [categoryData, formData?.transactionType]);
  console.log(categoryData, ' datas')
  return (
    <>
      <CategoriesPopup visibleCategoryPopup={visibleCategoryPopup} setVisibleCategoryPopup={setVisibleCategoryPopup} categoryData={categoryData} categoryType={formData.transactionType} setFormData={setFormData} handleNavigateToCategories={handleNavigateToCategories} />
      <View style={addTransactionStyles.transactionCardContainer}>
        <View style={addTransactionStyles.transactionType}>
          <TouchableOpacity onPress={() => handleTypeChange('EXPENSE')} style={{ flex: 1 }}>
            <Text
              style={[
                addTransactionStyles.transactionTypeText,
                formData?.transactionType === 'EXPENSE' && addTransactionStyles.transactionTypeFocus,
              ]}
            >
              EXPENSE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTypeChange('INCOME')} style={{ flex: 1 }}>
            <Text
              style={[
                addTransactionStyles.transactionTypeText,
                formData?.transactionType === 'INCOME' && addTransactionStyles.transactionTypeFocus,
              ]}
            >
              INCOME
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTypeChange('LOAN')} style={{ flex: 1 }}>
            <Text
              style={[
                addTransactionStyles.transactionTypeText,
                formData?.transactionType === 'LOAN' && addTransactionStyles.transactionTypeFocus,
              ]}
            >
              LOAN
            </Text>
          </TouchableOpacity>
        </View>
        <View style={addTransactionStyles.cardBody}>
          <View style={addTransactionStyles.cardRowBody}>
            <View style={addTransactionStyles.blankView}>
              <Text style={{ color: Colors.white }}>Category</Text>
              <TouchableOpacity
                onPress={() => setVisibleCategoryPopup(true)}
              >
              <LinearGradient
                colors={[Colors.black, Colors.generalCardBg, Colors.black]} // Subtle gradient colors
                start={{ x: 0, y: 0.5 }} // Top-left
                end={{ x: 1, y: 0.5 }}
                style={addTransactionStyles.categoryWrapper}
              >
                  <Text style={addTransactionStyles.categoryName}>{formData.categoryName}</Text>
              </LinearGradient>
                </TouchableOpacity>
            </View>
            <View style={addTransactionStyles.paymentModeContainer}>
              <Text style={{ color: Colors.white }}>Payment Mode</Text>
              <TouchableOpacity
                style={addTransactionStyles.paymentModeWrapper}
                onPress={() => setVisiblePaymentModePopup(true)}
              >
                {selectedPaymentMode?.icon}
                <Text style={{ color: Colors.white }}>{selectedPaymentMode?.label}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={addTransactionStyles.amountWrapper}>
            <Text style={[addTransactionStyles.rupeesText]}>₹</Text>
            <TextInput
              placeholder='0.00'
              keyboardType='phone-pad'
              autoFocus={!editTransaction}
              onChangeText={(text) => onChange('amount', text)}
              value={formData.amount}
              style={[addTransactionStyles.amountInput]}
              placeholderTextColor={Colors.white}
              maxLength={10}
            />
          </View>
        </View>
      </View>
      <TransactionPaymentModePopup visiblePaymentModePopup={visiblePaymenetModePopup} setVisiblePaymentModePopup={setVisiblePaymentModePopup} setSelectedPaymentMode={setSelectedPaymentMode} setFormData={setFormData} formData={formData} />
    </>
  );
};

export default TransactionCard;

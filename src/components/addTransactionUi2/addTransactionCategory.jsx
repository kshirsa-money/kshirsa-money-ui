import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import addTransactionStyles2 from '../../styles/stylesAddTransaction2'
import { Entypo } from '@expo/vector-icons'
import Colors from '../../styles/Colors'
import paymentModeOptions from '../../constants/paymentModeOptions'
import { useSelector } from 'react-redux'
import CategoriesPopup from '../category/categoriesPopup'
import TransactionPaymentModePopup from '../addTransaction/transactionPaymentModePopup'

const AddTransactionCategory = ({ formData, setFormData, handleInputChange, handleNavigateToCategories }) => {
    const { loading, data: categoryData, success } = useSelector((state) => state.viewCategoriesReducer)
    const [visibleCategoryPopup, setVisibleCategoryPopup] = useState(false);
    const [visiblePaymenetModePopup, setVisiblePaymentModePopup] = useState(false);
    const [selectedPaymentMode, setSelectedPaymentMode] = useState(paymentModeOptions[0]);

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            categoryName: categoryData?.[formData.transactionType]?.[0]?.category?.categoryName,
            categoryId: categoryData?.[formData.transactionType]?.[0]?.category?.categoryId,
        }));
        setSelectedPaymentMode(formData?.paymentMode ? paymentModeOptions.find((option) => option.value === formData.paymentMode) : paymentModeOptions[0]);
    }, [categoryData, formData?.transactionType, formData?.paymentMode]);
    return (
        <>
            <View style={addTransactionStyles2.categoryContainer}>
                <TouchableOpacity style={addTransactionStyles2.categoryBtn} onPress={() => setVisibleCategoryPopup(true)}
                >
                    <Text style={addTransactionStyles2.categoryTxt}>{formData.categoryName || 'Select a Category'}</Text>
                    <Entypo name="chevron-small-down" size={24} color={Colors.white} />
                </TouchableOpacity>
                <TouchableOpacity style={addTransactionStyles2.categoryBtn} onPress={() => setVisiblePaymentModePopup(true)}
                >
                    {/* <Text style={addTransactionStyles2.categoryTxt}>Payment mode</Text> */}
                    {selectedPaymentMode?.icon}
                    <Text style={addTransactionStyles2.categoryTxt}>{selectedPaymentMode?.label}</Text>
                    <Entypo name="chevron-small-down" size={24} color={Colors.white} />
                </TouchableOpacity>
            </View>

            <CategoriesPopup visibleCategoryPopup={visibleCategoryPopup} setVisibleCategoryPopup={setVisibleCategoryPopup} categoryData={categoryData} categoryType={formData.transactionType} setFormData={setFormData} handleNavigateToCategories={handleNavigateToCategories} />
            <TransactionPaymentModePopup visiblePaymentModePopup={visiblePaymenetModePopup} setVisiblePaymentModePopup={setVisiblePaymentModePopup} setSelectedPaymentMode={setSelectedPaymentMode} setFormData={setFormData} formData={formData} />
        </>
    )
}

export default AddTransactionCategory
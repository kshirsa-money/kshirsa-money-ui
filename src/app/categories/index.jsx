import { Text, View, TouchableOpacity, LayoutAnimation, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { transactionTypes, TransactionTypesToMap } from '../../constants/utils'
import categoryStyles from '../../styles/stylesCategory'
import Colors from '../../styles/Colors'
import { useDispatch, useSelector } from 'react-redux'
import viewCategoriesAction from '../../redux/actions/viewCategoriesAction'
import { FontAwesome6 } from '@expo/vector-icons'
import CategoryList from '../../components/category/categoryList'
import AddEditCategoryModal from '../../components/category/addEditCategoryModal'
import { useLocalSearchParams } from 'expo-router'

const ViewCategories = () => {
  const dispatch = useDispatch();
  const {transactionType } = useLocalSearchParams()
  const { loading, data, success } = useSelector((state) => state.viewCategoriesReducer)
   const {success: updateCategorySuccess } = useSelector((state) => state.updateCategoryReducer) || {}
  const { success: addCategorySuccess } = useSelector((state) => state.addCategoryReducer) || {}
  const [selectedType, setSelectedType] = useState(transactionType || transactionTypes.EXPENSE)
  const [openCategoryModal, setOpenCategoryModal] = useState(false)
  const [clickedCategory, setClickedCategory] = useState(null)

  useEffect(() => {
    dispatch(viewCategoriesAction())
  }
  , [addCategorySuccess, updateCategorySuccess])

  const handlePress = (types) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setSelectedType(types)
  }

  useEffect(() => {
    if (transactionType) {
      setSelectedType(transactionType);
    }
  }, [transactionType]);

  const handleClickCategory = (category) => {
  if(category?.isDefault || category?.isInUse) return;
  setOpenCategoryModal(true)
  if(category) {
    setClickedCategory(category)
  } else {
    setClickedCategory(null)
  }
  }

  return (
    <ScrollView style={categoryStyles.container}>
       {openCategoryModal && <AddEditCategoryModal setOpenCategoryModal={setOpenCategoryModal} openCategoryModal={openCategoryModal} editCategoryData={clickedCategory} dispatch={dispatch} transactionType={selectedType}  />}
      <View style={categoryStyles.transactionTypeContainer}>
        {TransactionTypesToMap.map((types, index) => (
          <TouchableOpacity
            key={index}
            style={[
              categoryStyles.transactionTypeBtn,
              selectedType === types && { backgroundColor: Colors.primary }
            ]}
            onPress={() => handlePress(types)}
          >
            <Text style={categoryStyles.transactionTypeText}>{types}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={categoryStyles.categoryBtn} onPress={() => handleClickCategory(false)}>
        <FontAwesome6 name="add" size={24} color={Colors.white} />
        <Text style={categoryStyles.transactionTypeText}>Add Category</Text>
      </TouchableOpacity>
      <CategoryList data={data} loading={loading} categoryType={selectedType} handleClickCategory={handleClickCategory} />
    </ScrollView>
  )
}

export default ViewCategories

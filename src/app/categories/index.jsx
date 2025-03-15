import { StyleSheet, Text, View, TouchableOpacity, LayoutAnimation, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { transactionTypes, TransactionTypesToMap } from '../../constants/utils'
import categoryStyles from '../../styles/stylesCategory'
import Colors from '../../styles/Colors'
import { use } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import viewCategoriesAction from '../../redux/actions/viewCategoriesAction'
import recentTransactionStyles from '../../styles/stylesRecentTransaction'
import KshirsaNoDataImage from '../../../assets/animatedImage/noDataImage'
import uiText from '../../constants/uiTexts'
import KshirsaLoadingScreen from '../../small-components/KshirsaLoading'
import KshirsaMoneyLoadingImg from '../../../assets/animatedImage/moneyLoadingImage'
import { FontAwesome6 } from '@expo/vector-icons'
import CategoryList from '../../components/category/categoryList'
import AddEditCategoryModal from '../../components/category/addEditCategoryModal'

const ViewCategories = () => {
  const dispatch = useDispatch();
  const { loading, data, success } = useSelector((state) => state.viewCategoriesReducer)
  const [selectedType, setSelectedType] = useState(transactionTypes.EXPENSE)
  const [openCategoryModal, setOpenCategoryModal] = useState(false)
  const [clickedCategory, setClickedCategory] = useState(null)
  const [clickAddCategory, setClickAddCategory] = useState(false)

  useEffect(() => {
    dispatch(viewCategoriesAction())
  }
  , [])
  const handlePress = (types) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setSelectedType(types)
  }


  const handleClickCategory = (category) => {
  console.log('category', category)
  setOpenCategoryModal(true)
  if(category) {
    setClickedCategory(category)
  } else {
    setClickedCategory(null)
  }
  }

  return (
    <ScrollView style={categoryStyles.container}>
       {openCategoryModal && <AddEditCategoryModal setOpenCategoryModal={setOpenCategoryModal} openCategoryModal={openCategoryModal} editCategoryData={clickedCategory}  />}
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

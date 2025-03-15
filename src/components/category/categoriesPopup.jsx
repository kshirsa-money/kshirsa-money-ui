import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import KshirsaPopup from '../../small-components/KshirsaPopup'
import CategoryList from './categoryList'
import categoryStyles from '../../styles/stylesCategory'
import { FontAwesome6 } from '@expo/vector-icons'
import Colors from '../../styles/Colors'
import { useRouter } from 'expo-router'
import uiRoutes from '../../constants/uiRoutes'

const CategoriesPopup = ({ visibleCategoryPopup, setVisibleCategoryPopup, categoryData, categoryType, setFormData }) => {
  const router = useRouter()
  const handleClickCategory = (category) => {
    setFormData((prev) => ({
      ...prev,
      categoryName: category?.category?.categoryName,
      categoryId: category?.category?.categoryId,
    }))
    setVisibleCategoryPopup(false)
  }
  return (
    <KshirsaPopup
      visible={visibleCategoryPopup}
      onClose={() => setVisibleCategoryPopup(false)}
      header={`Select a ${categoryType?.toLowerCase()} category`}
    >
      <View style={categoryStyles.popupContainer}>
        <TouchableOpacity style={categoryStyles.categoryBtn} onPress={() => router.push(uiRoutes.categories)}>
          <FontAwesome6 name="add" size={24} color={Colors.white} />
        </TouchableOpacity>
        <CategoryList data={categoryData} categoryType={categoryType} handleClickCategory={handleClickCategory} />
      </View>
    </KshirsaPopup>
  )
}

export default CategoriesPopup
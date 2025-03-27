import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import categoryStyles from '../../styles/stylesCategory'
import KshirsaMoneyLoadingImg from '../../../assets/animatedImage/moneyLoadingImage'
import KshirsaNoDataImage from '../../../assets/animatedImage/noDataImage'
import uiText from '../../constants/uiTexts'
import { MaterialIcons } from '@expo/vector-icons'
import Colors from '../../styles/Colors'
import { useDispatch } from 'react-redux'
import deleteCategoryAction from '../../redux/actions/deleteCategoryAction'
import KshirsaToast from '../../small-components/KshirsaToast'
import { showToast } from '../../constants/toastUtils'

const CategoryList = ({ data, loading, categoryType, handleClickCategory, fromPopup, deleteCategoryLoading }) => {
  const dispatch = useDispatch()

  const handleDeleteCategory = (category) => {
    const disabled = category?.isDefault || category?.isInUse
    console.log(category, 'category')
    if (disabled) {
      showToast({
        message: uiText.DEFAULT_CATEGORY_NOT_dELETE,
        type: 'info',
      })
      return
    }
    const deleteQuery = {
      categoryId: category?.category?.categoryId
    }
    dispatch(deleteCategoryAction(deleteQuery))
  }

  return (
    <View style={categoryStyles.categoryContainer}>
      {
        loading ?
          <KshirsaMoneyLoadingImg />
          :
          <View style={categoryStyles.categoryList}>
            {data?.[categoryType]?.length > 0 ?
              data?.[categoryType]?.map((category, index) => {
                return (
                  <View style={categoryStyles.categoryItem} key={index}>
                    <TouchableOpacity key={index} style={categoryStyles.categoryWrapper} onPress={() => handleClickCategory(category)}>
                      <Text style={categoryStyles.categoryText}>{category?.category?.categoryName}</Text>
                      <Text style={categoryStyles.categoryDesc}>{category?.category?.description}</Text>
                    </TouchableOpacity>
                    {!fromPopup &&
                      deleteCategoryLoading ? <ActivityIndicator size="small" color={Colors.white} />
                      :
                      <TouchableOpacity onPress={() => handleDeleteCategory(category)}>
                        <MaterialIcons name="delete" size={24} color={Colors.white} />
                      </TouchableOpacity>}
                  </View>
                )
              })
              :
              <View style={categoryStyles.noDataContainer}>
                <KshirsaNoDataImage />
                <Text style={categoryStyles.noDataText}>{uiText.NO_CATEGORY_FOUND}</Text>
              </View>
            }
          </View>
      }
    </View>
  )
}

export default CategoryList
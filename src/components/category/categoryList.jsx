import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import categoryStyles from '../../styles/stylesCategory'
import KshirsaMoneyLoadingImg from '../../../assets/animatedImage/moneyLoadingImage'
import KshirsaNoDataImage from '../../../assets/animatedImage/noDataImage'
import uiText from '../../constants/uiTexts'

const CategoryList = ({ data, loading, categoryType, handleClickCategory }) => {

  return (
    <View style={categoryStyles.categoryContainer}>
      {
        loading ?
          <KshirsaMoneyLoadingImg />
          :
          <View style={categoryStyles.categoryList}>
            {data?.[categoryType]?.length > 0 ?
              data?.[categoryType]?.map((category, index) => (
                <TouchableOpacity key={index} style={categoryStyles.categoryWrapper} onPress={() => handleClickCategory(category)}>
                  <Text style={categoryStyles.categoryText}>{category?.category?.categoryName}</Text>
                  <Text style={categoryStyles.categoryDesc}>{category?.category?.description}</Text>
                </TouchableOpacity>
              ))
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
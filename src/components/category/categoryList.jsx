import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import categoryStyles from '../../styles/stylesCategory'
import KshirsaMoneyLoadingImg from '../../../assets/animatedImage/moneyLoadingImage'
import KshirsaNoDataImage from '../../../assets/animatedImage/noDataImage'
import uiText from '../../constants/uiTexts'
import { MaterialIcons } from '@expo/vector-icons'
import Colors from '../../styles/Colors'

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
                <View style={categoryStyles.categoryItem} key={index}>
                <TouchableOpacity key={index} style={categoryStyles.categoryWrapper} onPress={() => handleClickCategory(category)}>
                  <Text style={categoryStyles.categoryText}>{category?.category?.categoryName}</Text>
                  <Text style={categoryStyles.categoryDesc}>{category?.category?.description}</Text>
                </TouchableOpacity>
                <TouchableOpacity  disabled={category?.isDefault || category?.isInUse}>
                <MaterialIcons name="delete" size={24} color={Colors.white} />
                </TouchableOpacity>
                </View>
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
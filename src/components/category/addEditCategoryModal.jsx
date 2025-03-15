import { View, Text } from 'react-native'
import React, { useState } from 'react'
import KshirsaModal from '../../small-components/KshirsaModal'
import KshirsaInput from '../../small-components/KshirsaInput'
import categoryStyles from '../../styles/stylesCategory'
import uiText from '../../constants/uiTexts'
import { checkIsModifiedFormData } from '../../utils/helper'

const AddEditCategoryModal = ({setOpenCategoryModal, openCategoryModal, editCategoryData}) => {
    const [formData, setFormData] = useState({
        categoryName: editCategoryData?.category?.categoryName || '',
        description: editCategoryData?.category?.description || ''
    })
    const initialData = {
        categoryName: editCategoryData?.category?.categoryName || '',
        description: editCategoryData?.category?.description || ''
    }
    const [disabledConfirm, setDisabledConfirm] = useState(true)

    const onClose = () => {
        setOpenCategoryModal(false)
    }

    const handleChange = (text, field) => {
        setFormData({
            ...formData,
            [field]: text
        })
        if(!checkIsModifiedFormData(formData, initialData) || formData.categoryName === '') {
            setDisabledConfirm(false)
        } else {
            setDisabledConfirm(true)
        }
    }

  return (
    <KshirsaModal
    isVisible={openCategoryModal}
    onClose={onClose}
    title={editCategoryData ? 'Edit Category' : 'Add Category'}
    confirmText={editCategoryData ? 'Edit Category' : 'Add Category'}
    closeText='Close'
    onConfirm={() => console.log('Add Category')}
    confirmDisabled={disabledConfirm}
    >
        <View style={categoryStyles.modalContainer}>
            <KshirsaInput placeholder={uiText.CATEGORY_NAME} onChangeText={(text) => handleChange(text, 'categoryName')} value={formData.categoryName} needErrorMsg={false} />
            <KshirsaInput placeholder={uiText.CATEGORY_DESC} onChangeText={(text) => handleChange(text, 'description')} value={formData.description} needErrorMsg={false} />
        </View>
    </KshirsaModal>
  )
}

export default AddEditCategoryModal
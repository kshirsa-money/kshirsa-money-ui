import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import KshirsaModal from '../../small-components/KshirsaModal'
import KshirsaInput from '../../small-components/KshirsaInput'
import categoryStyles from '../../styles/stylesCategory'
import uiText from '../../constants/uiTexts'
import { checkIsModifiedFormData } from '../../utils/helper'
import updateCategoryAction from '../../redux/actions/updateCategoryAction'
import { useSelector } from 'react-redux'
import { resetAddCategoryAction } from '../../redux/reducers/addCategoryReducer'
import { resetUpdateCategoryAction } from '../../redux/reducers/updateCategoryReducer'
import addCategoryAction from '../../redux/actions/addCategoryAction'

const AddEditCategoryModal = ({setOpenCategoryModal, openCategoryModal, editCategoryData, dispatch, transactionType}) => {
    const {success: updateCategorySuccess, loading: updateCategoryLoading} = useSelector((state) => state.updateCategoryReducer) || {}
    const { success: addCategorySuccess, loading: addCategoryLoading } = useSelector((state) => state.addCategoryReducer) || {}

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
    useEffect(() => {
        if (editCategoryData) {
            setFormData({
                categoryName: editCategoryData?.category?.categoryName,
                description: editCategoryData?.category?.description
            })
        }
    }, [editCategoryData])

    useEffect(() => {
        if(updateCategorySuccess || addCategorySuccess) {
            onClose()
        }

        return () => {
            dispatch(resetAddCategoryAction());
            dispatch(resetUpdateCategoryAction());
        }
    }, [updateCategorySuccess, addCategorySuccess])

    const handleChange = (text, field) => {
        const updatedFormData = {
            ...formData,
            [field]: text
        }
        setFormData(updatedFormData)
    
        const isModified = Object.keys(updatedFormData).some(key => 
            checkIsModifiedFormData(updatedFormData[key], initialData[key])
        )
    
        if (
            !isModified ||
            (field === 'categoryName' && text === '') ||
            (updatedFormData.categoryName === '')
        ) {
            setDisabledConfirm(true)
        } else {
            setDisabledConfirm(false)
        }
    }

    const handleConfirm = () => {
        if(editCategoryData) {
            dispatch(updateCategoryAction({...formData, categoryId: editCategoryData?.category?.categoryId}))
        }
        else {
            dispatch(addCategoryAction({...formData, transactionType}))
        }
    }

console.log(editCategoryData, 'editCategoryData')
  return (
    <KshirsaModal
    isVisible={openCategoryModal}
    onClose={onClose}
    title={editCategoryData ? 'Edit Category' : 'Add Category'}
    confirmText={editCategoryData ? 'Edit Category' : 'Add Category'}
    closeText='Close'
    onConfirm={handleConfirm}
    confirmDisabled={disabledConfirm}
    confirmLoading={updateCategoryLoading || addCategoryLoading}
    >
        <View style={categoryStyles.modalContainer}>
            <KshirsaInput placeholder={uiText.CATEGORY_NAME} onChangeText={(text) => handleChange(text, 'categoryName')} value={formData.categoryName} needErrorMsg={false} />
            <KshirsaInput placeholder={uiText.CATEGORY_DESC} onChangeText={(text) => handleChange(text, 'description')} value={formData.description} needErrorMsg={false} />
        </View>
    </KshirsaModal>
  )
}

export default AddEditCategoryModal
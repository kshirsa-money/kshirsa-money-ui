import { showToast } from "./toastUtils"
import uiText from "./uiTexts"
import { toastTypes } from "./utils"

export const renderOtpSendSuccessToast = () => {
    return showToast({
        message: uiText.OTP_SEND_SUCCESS,
        type: toastTypes.SUCCESS,
    })
}

export const renderOtpSendErrorToast = () => {
    return showToast({
        message: uiText.OTP_SEND_ERROR,
        type: toastTypes.ERROR,
    })
}

export const renderOtpValidationFailedToast = () => {
    return showToast({
        message: uiText.OTP_VALIDATION_FAILED,
        type: toastTypes.ERROR,
    })
}

export const renderLoginSuccessToast = () => {
    return showToast({
        message: uiText.LOGIN_SUCCESS,
        type: toastTypes.SUCCESS,
    })
}

export const renderLogoutSuccessToast = () => {
    return showToast({
        message: uiText.LOGOUT_SUCCESS,
        type: toastTypes.SUCCESS,
    })
}

export const renderTransactionSuccessToast = (deleteTransactionReducer, editTransaction) => {
    return showToast({
        message: deleteTransactionReducer.success ? uiText.DELETE_TRANSACTION_SUCCESS : editTransaction ? uiText.UPDATE_TRANSACTION_SUCCESS : uiText.ADD_TRANSACTION_SUCCESS,
        type: toastTypes.SUCCESS,
    })
}

export const renderDeleteOrDuplicateSuccessToast = (deleteTransactionSuccess) => {
    return showToast({
        message: deleteTransactionSuccess ? uiText.DELETE_TRANSACTION_SUCCESS : uiText.ADD_DUPLICATE_TRANSACTION_SUCCESS,
        type: toastTypes.SUCCESS,
    })
}
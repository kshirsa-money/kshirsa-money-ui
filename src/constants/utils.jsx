import { Dimensions } from "react-native"

export const STANDARD_EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/



export const errorCodes = {
    jwtMissing : 126,
    jwtExpired : 100
}

export const transactionTypes = {
    EXPENSE: 'EXPENSE',
    INCOME: 'INCOME',
    LOAN: 'LOAN',
}

export const TransactionTypesToMap = [
'EXPENSE',
'INCOME',
'LOAN',
]

export const toastTypes = {
    SUCCESS: 'success',
    ERROR: 'error',
    INFO: 'info',
    WARNING: 'warning'
}

export const screenHeight = Dimensions.get('window').height
export const screenWidth = Dimensions.get('window').width

export const defaultamountRange = {
    MIN: 0,
    MAX: 20000
}

export const TransactionSortByToMap = [
    {
        label: 'New to Old',
        value: 'Latest'
    },
    {
        label: 'Old to New',
        value: 'Oldest'
    },
    {
        label: 'Amount - High to Low',
        value: 'AmountHighToLow'
    },
    {
        label: 'Amount - Low to High',
        value: 'AmountLowToHigh'
    },
]

// export const paymentModesToMap = {p
// Latest', 'Oldest', 'AmountHighToLow', 'AmountLowToHigh
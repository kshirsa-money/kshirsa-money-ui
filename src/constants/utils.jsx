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

export const screenHeight = Dimensions.get('window').height
export const screenWidth = Dimensions.get('window').width
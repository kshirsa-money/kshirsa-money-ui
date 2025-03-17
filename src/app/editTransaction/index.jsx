import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import AddTransaction from '../AddTransaction/index'
import { useLocalSearchParams } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import getTransactionAction from '../../redux/actions/getTransactionAction'

const index = () => {
  const savedFormData = useSelector((state) => state.savedFormDataReducer.data);

  const dispatch = useDispatch()
  const {transactionId} = useLocalSearchParams()

  useEffect(() => {
    if(!savedFormData) dispatch(getTransactionAction(transactionId))
  }, [transactionId, savedFormData])

  return (
    <AddTransaction editTransaction transactionId={transactionId} />
  )
}

export default index
import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import AddTransaction from '../AddTransaction/index'
import { useLocalSearchParams } from 'expo-router'
import { useDispatch } from 'react-redux'
import getTransactionAction from '../../redux/actions/getTransactionAction'

const index = () => {
  const dispatch = useDispatch()
  const {transactionId} = useLocalSearchParams()

  useEffect(() => {
    dispatch(getTransactionAction(transactionId))
  }, [transactionId])

  return (
    <AddTransaction editTransaction transactionId={transactionId} />
  )
}

export default index
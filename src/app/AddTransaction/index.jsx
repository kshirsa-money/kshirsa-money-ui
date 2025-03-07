import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetButtonState,
  setButtonState,
} from '../../redux/reducers/floatingBtnReducer';
import TransactionCard from '../../components/addTransaction/transactionCard';
import TransactionDateTime from '../../components/addTransaction/transactionDateTime';
import TransactionCategory from '../../components/addTransaction/transactionCategory';
import TransactionNotes from '../../components/addTransaction/transactionNotes';
import Colors from '../../styles/Colors';
import { addTransactionStyles } from '../../styles/stylesAddTransaction';
import addTransactionAction from '../../redux/actions/addTransactionAction';
import KshirsaButton from '../../small-components/KshirsaButton';
import { AntDesign } from '@expo/vector-icons';
import KshirsaLoadingScreen from '../../small-components/KshirsaLoading';
import { useRouter } from 'expo-router';
import apiRoutes from '../../constants/apiRoutes';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { resetaddTransactionAction } from '../../redux/reducers/addTransactionReducer';
import uiText from '../../constants/uiTexts';
import { TouchableWithoutFeedback } from 'react-native-web';

const AddTransaction = () => {
  const dispatch = useDispatch();
  const router = useRouter()
  const addTransactionResponse = useSelector((state) => state.addTransactionReducer);
  const [formData, setFormData] = useState({
    amount: '',
    paymentMode: 'CASH',
    note: '',
    transactionType: 'EXPENSE',
    transactionTime: new Date(),
    categoryId: 'Default-1',
    isRecurring: false,
    tags: [''],
  });
  const [errors, setErrors] = useState('');
  console.log(formData, 'formData')
  useEffect(() => {
    if(addTransactionResponse.success && !addTransactionResponse.loading) {
      setFormData({
        amount: '',
        paymentMode: 'CASH',
        note: '',
        transactionType: 'EXPENSE',
        transactionTime: new Date(),
        categoryId: 'Default-1',
        isRecurring: false,
        tags: [''],
      });
      router.replace(apiRoutes.main)
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: uiText.ADD_TRANSACTION_SUCCESS,
        titleStyle: { color: Colors.secondary },
      });
    }

    return () => {
      dispatch(resetaddTransactionAction());
    };
  }, [addTransactionResponse.success, addTransactionResponse.loading]);
  // Handle Input Change
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === 'amount') {
      if (!value) {
        setErrors('Amount cannot be empty!');
      } else if (value.length > 10) {
        setErrors('Amount cannot be more than 10000000!');
      } else {
        setErrors('');
      }
    }
  }

  // Save Transaction
  const handleSaveTransaction = useCallback(() => {
    console.log('Saving Transaction:', formData);

    if (!formData.amount) {
      setErrors('Amount cannot be empty!');
      return;
    }

    if (formData.amount.length > 10) {
      setErrors('Amount cannot be more than 10000000!');
      return;
    }
    setErrors('');
    dispatch(addTransactionAction(formData));
  }, [formData]);

  return (
    <>
 <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ flex: 1, backgroundColor: Colors.moodyBlack }}>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={addTransactionStyles.container}>
          <TransactionCard
            onChange={handleInputChange}
            formData={formData}
            errors={errors}
            setFormData={setFormData}
          />

          {errors ? (
            <Text style={{ color: Colors.red, paddingHorizontal: 10 }}>{errors}</Text>
          ) : null}

          <TransactionDateTime
            onChange={handleInputChange}
            formData={formData}
            setFormData={setFormData}
          />

          <TransactionCategory
            onChange={handleInputChange}
            formData={formData}
            setFormData={setFormData}
          />

          <TransactionNotes
            onChange={handleInputChange}
            formData={formData}
            setFormData={setFormData}
          />
          <View style={addTransactionStyles.buttonContainer}>
          <KshirsaButton icon={<AntDesign name="save" size={30} color={Colors.white} />} onPress={handleSaveTransaction} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
    {addTransactionResponse.loading && <KshirsaLoadingScreen />}
    </>
  );
};

export default AddTransaction;

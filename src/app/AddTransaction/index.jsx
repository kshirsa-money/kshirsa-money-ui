import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
  BackHandler,
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
import uiRoutes from '../../constants/uiRoutes';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { resetaddTransactionAction } from '../../redux/reducers/addTransactionReducer';
import uiText from '../../constants/uiTexts';
import { TouchableWithoutFeedback } from 'react-native-web';
import KshirsaCalculator from '../../small-components/KshirsaCalculator';
import TransactionTags from '../../components/addTransaction/transactionTags';
import { KshirsaAlert } from '../../small-components/KshirsaAlert';
import updateTransactionAction from '../../redux/actions/updateTransactionAction';
import { resetUpdateTransactionAction } from '../../redux/reducers/updateTransactionReducer';
import { resetDeleteTransactionAction } from '../../redux/reducers/deleteTransactionReducer';
import { checkIsModifiedFormData } from '../../utils/helper';
import viewCategoriesAction from '../../redux/actions/viewCategoriesAction';

const AddTransaction = ({ editTransaction = false, transactionId }) => {
  const dispatch = useDispatch();
  const router = useRouter()
  const addTransactionResponse = useSelector((state) => state.addTransactionReducer);
  const { data: viewTransactionData, loading: viewTransactionLoading } = useSelector((state) => state.getTransactionReducer);
  const { success: updateTransactionSuccess, loading: updateTransactionLoading, data: updateTransactionData } = useSelector((state) => state.updateTransactionReducer);
  const deleteTransactionReducer = useSelector((state) => state.deleteTransactionReducer);

  const [formData, setFormData] = useState({
    amount: '',
    paymentMode: 'CASH',
    note: '',
    transactionType: 'EXPENSE',
    transactionTime: '',
    categoryId: 'Default-1',
    categoryName: 'Others',
    isRecurring: false,
    tags: [],
  });
  const [initialFormData, setInitialFormData] = useState({
    amount: '',
    paymentMode: 'CASH',
    note: '',
    transactionType: 'EXPENSE',
    transactionTime: '',
    categoryId: 'Default-1',
    categoryName: 'Others',
    isRecurring: false,
    tags: [],
  });
  const [isFormModified, setIsFormModified] = useState(false);
  const [errors, setErrors] = useState('');

  useEffect(() => {
    if (editTransaction) {
      const initialData = {
        amount: String(viewTransactionData?.amount),
        paymentMode: viewTransactionData?.paymentMode,
        note: viewTransactionData?.note,
        transactionType: viewTransactionData?.transactionType,
        transactionTime: new Date(viewTransactionData?.transactionTime),
        categoryId: viewTransactionData?.category?.categoryId,
        categoryName: viewTransactionData?.category?.categoryName,
        isRecurring: viewTransactionData?.isRecurring,
        tags: viewTransactionData?.tags,
      };
      setFormData(initialData);
      setInitialFormData(initialData);
    }
  }, [editTransaction, viewTransactionData]);

  useEffect(() => {
    if ((addTransactionResponse.success && !addTransactionResponse.loading) || updateTransactionSuccess || deleteTransactionReducer.success) {
      setFormData({
        amount: '',
        paymentMode: 'CASH',
        note: '',
        transactionType: 'EXPENSE',
        transactionTime: new Date(),
        categoryId: 'Default-1',
        isRecurring: false,
        tags: [],
      });
      router.replace(uiRoutes.main)
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: deleteTransactionReducer.success ? uiText.DELETE_TRANSACTION_SUCCESS : editTransaction ? uiText.UPDATE_TRANSACTION_SUCCESS : uiText.ADD_TRANSACTION_SUCCESS,
        titleStyle: { color: Colors.secondary },
      });
    }

    return () => {
      dispatch(resetaddTransactionAction());
      dispatch(resetUpdateTransactionAction());
      dispatch(resetDeleteTransactionAction());
    };
  }, [addTransactionResponse.success, addTransactionResponse.loading, updateTransactionSuccess, deleteTransactionReducer.success]);

  useEffect(() => {
    const isModified = checkIsModifiedFormData(formData, initialFormData);
    setIsFormModified(isModified);
  }, [formData, initialFormData]);

  useEffect(() => {
    dispatch(viewCategoriesAction())
  }, [])

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

  const handleSaveTransaction = useCallback(() => {
    if (!formData.amount) {
      setErrors('Amount cannot be empty!');
      return;
    }

    if (formData.amount.length > 10) {
      setErrors('Amount cannot be more than 10000000!');
      return;
    }
    setErrors('');
    if (editTransaction) {
      const updateTransactionBody = {
        ...formData,
        transactionId: transactionId
      }
      dispatch(updateTransactionAction(updateTransactionBody));
    } else {
      dispatch(addTransactionAction(formData))
    }
  }, [formData]);

  useEffect(() => {
    const handleBackPress = () => {
      if (isFormModified) {
        KshirsaAlert.alert(
          'Unsaved Changes',
          'You have unsaved changes. Are you sure you want to discard?',
          [
            { text: 'Stay', style: 'cancel' },
            { text: 'Discard', onPress: () => router.back() },
          ],
          // { cancelable: false }
        );
        return true; // Prevent default back action
      }
      return false; // Allow default back action
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      backHandler.remove(); // Cleanup the event listener
    };
  }, [isFormModified]);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ flex: 1, backgroundColor: Colors.moodyBlack }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'undefined'}
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
                editTransaction={editTransaction}
              />

              {errors ? (
                <Text style={{ color: Colors.red, paddingHorizontal: 10 }}>{errors}</Text>
              ) : null}

              <TransactionDateTime
                onChange={handleInputChange}
                formData={formData}
                setFormData={setFormData}
                setInitialFormData={setInitialFormData}
              />
              {/* 
          <TransactionCategory
            onChange={handleInputChange}
            formData={formData}
            setFormData={setFormData}
          /> */}
              <TransactionTags
                onChange={handleInputChange}
                formData={formData}
                setFormData={setFormData} />
              <TransactionNotes
                onChange={handleInputChange}
                formData={formData}
                setFormData={setFormData}
              />
              <View style={addTransactionStyles.buttonContainer}>
                <KshirsaButton icon={<AntDesign name="save" size={30} color={Colors.white} />} onPress={handleSaveTransaction} disabled={editTransaction ? !isFormModified : false} loading={addTransactionResponse.loading} />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      {(addTransactionResponse.loading || viewTransactionLoading) && <KshirsaLoadingScreen />}
    </>
  );
};

export default AddTransaction;

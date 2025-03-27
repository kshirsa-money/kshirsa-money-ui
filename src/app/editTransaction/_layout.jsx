import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import Colors from '../../styles/Colors';
import { AntDesign } from '@expo/vector-icons';
import { KshirsaAlert } from '../../small-components/KshirsaAlert';
import { useDispatch, useSelector } from 'react-redux';
import uiRoutes from '../../constants/uiRoutes';
import deleteTransactionAction from '../../redux/actions/deleteTransactionAction';
import { TouchableOpacity } from 'react-native';

export default function EditTransactionLayout() {
  const dispatch = useDispatch();
  const { loading: viewTransactionLoading, success: viewTransactionSuccess } = useSelector((state) => state.getTransactionReducer);
  const {transactionId} = useLocalSearchParams();
  const disabledDelete = viewTransactionLoading || !viewTransactionSuccess;
  const handleDelete = () => {
    KshirsaAlert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            dispatch(deleteTransactionAction({ transactionId: String(transactionId) }));
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Edit Transaction',
          headerShown: false,
          headerStyle: { backgroundColor: Colors.generalCardBg },
          headerTintColor: Colors.white,
          headerTitleStyle: { fontWeight: 'bold' },
          headerRight: () => (
            <TouchableOpacity onPress={handleDelete} disabled={disabledDelete} style={disabledDelete && { opacity: 0.2 }}>
              <AntDesign
                name="delete"
                size={24}
                color={Colors.white}
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}


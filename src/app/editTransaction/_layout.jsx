import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import Colors from '../../styles/Colors';
import { AntDesign } from '@expo/vector-icons';
import { KshirsaAlert } from '../../small-components/KshirsaAlert';
import { useDispatch } from 'react-redux';
import uiRoutes from '../../constants/uiRoutes';
import deleteTransactionAction from '../../redux/actions/deleteTransactionAction';

export default function EditTransactionLayout() {
  const dispatch = useDispatch();
  const {transactionId} = useLocalSearchParams();

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
          headerStyle: { backgroundColor: Colors.generalCardBg },
          headerTintColor: Colors.white,
          headerTitleStyle: { fontWeight: 'bold' },
          headerRight: () => (
            <AntDesign
              name="delete"
              size={24}
              color={Colors.white}
              onPress={handleDelete}
              style={{ marginRight: 15 }}
            />
          ),
        }}
      />
    </Stack>
  );
}


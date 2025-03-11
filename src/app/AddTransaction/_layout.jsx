import { Stack } from 'expo-router';
import Colors from '../../styles/Colors';

export default function AddTransactionLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Add Transaction',
          headerStyle: { backgroundColor: Colors.generalCardBg },
          headerTintColor: Colors.white,
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
    </Stack>
  );
}


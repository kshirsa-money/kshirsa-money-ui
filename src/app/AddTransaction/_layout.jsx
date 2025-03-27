import { Stack } from 'expo-router';
import Colors from '../../styles/Colors';
import GoBack from '../../small-components/goBack';

export default function AddTransactionLayout() {
  return (
    <Stack
      options={{
        animation: 'slide_from_right', // Default animation for the stack
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Add Transaction',
          headerShown: false,
          animation: 'slide_from_right', // Animation when opening the page
          gestureDirection: 'horizontal', // Gesture for back navigation
        }}
      />
    </Stack>
  );
}
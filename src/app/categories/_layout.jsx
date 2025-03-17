import { Slot, Stack } from 'expo-router';
import Colors from '../../styles/Colors';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import GoBack from '../../small-components/goBack';

export default function categoriesLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerStyle: { backgroundColor: Colors.moodyBlack },
                headerTintColor: Colors.white,
                headerBackTitleVisible: false,
                headerBackVisible: true,
                headerLeft: () => <GoBack />,
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    title: 'Categories',
                }}
            />
        </Stack>
    );
}


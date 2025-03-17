import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import Colors from '../styles/Colors'

const GoBack = () => {
    const router = useRouter()
    return (
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 20 }}>
            <Ionicons name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
    )
}

export default GoBack
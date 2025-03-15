import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../styles/Colors';
import KshirsaButtonLoadingAnimation from '../../assets/animatedImage/KshirsaButtonLoading';

const KshirsaButton = ({
    title = 'Button',
    buttonStyle,
    titleStyle,
    onPress,
    icon = null,
    disabled = false,
    loading = false
}) => {
    const buttonWidthRef = useRef(0);
    const [widthMeasured, setWidthMeasured] = useState(false);

    // Measure button width only once
    const handleLayout = (event) => {
        if (event?.nativeEvent?.layout && !widthMeasured) {
            buttonWidthRef.current = event.nativeEvent.layout.width;
            setWidthMeasured(true);
        }
    };

    // Determine what to render inside the button
    const renderContent = () => {
        if (loading) return <KshirsaButtonLoadingAnimation width={buttonWidthRef.current} />;
        if (icon) return icon;
        return <Text style={[styles.text, titleStyle]}>{title}</Text>;
    };

    return (
        <LinearGradient
            colors={disabled ? Colors.disabledButtonLinearGradient : loading ? Colors.buttonLoadingGradient : Colors.buttonLinearGradient}
            style={[styles.container, buttonStyle]}
            onLayout={handleLayout}
        >
            <TouchableOpacity 
                onPress={onPress} 
                activeOpacity={disabled ? 1 : 0.7} 
                disabled={disabled || loading} 
                style={styles.touchable}
            >
                {renderContent()}
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 50, // Ensures the gradient has smooth corners
        overflow: 'hidden', // Prevents touch effect from going outside
    },
    touchable: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%', // Ensures proper sizing
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default KshirsaButton;

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../styles/Colors';
import KshirsaButtonLoadingAnimation from '../../assets/animatedImage/KshirsaButtonLoading';
import cssUtils from '../constants/cssUtils';

const KshirsaButton = ({
    title = 'Button',
    buttonStyle = {},
    titleStyle,
    onPress,
    icon = null,
    disabled = false,
    loading = false,
    width = 'fit-content',
    customColor = ''
}) => {
    const [buttonSize, setButtonSize] = useState({ width: {width}, height:'fit-content' }); // Default size

    const handleLayout = (event) => {
        const { width, height } = event.nativeEvent.layout;
        if (width && height && (width !== buttonSize.width || height !== buttonSize.height)) {
            setButtonSize({ width, height });
        }
    };

    return (
        <TouchableOpacity style={[ buttonStyle]}
        onPress={onPress}
        disabled={disabled || loading}>
            <LinearGradient
                colors={disabled ? Colors.disabledButtonLinearGradient : loading ? Colors.buttonLoadingGradient : customColor ? customColor : Colors.buttonLinearGradient}
                style={styles.container}
            >
                <View
                    onLayout={handleLayout}
                    style={[styles.touchable, { width: buttonSize.width, height: buttonSize.height }]}
                >
                    {loading ? (
                        <KshirsaButtonLoadingAnimation width={buttonSize.width} height={buttonSize.height} />
                    ) : icon ? (
                        icon
                    ) : (
                        <Text style={[disabled ? styles.disabledText : styles.text, titleStyle]}>{title}</Text>
                    )}
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        minWidth: 100, // Ensure the button has a measurable size
        minHeight: 45,
    },
    container: {
        borderRadius: 50,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    touchable: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: Colors.white,
        fontSize: cssUtils.smallTextSize,
        fontWeight: cssUtils.bold,
    },
    disabledText: {
        color: Colors.lightGrey,
        fontSize: cssUtils.smallTextSize,
        fontWeight: cssUtils.bold,
    }

});

export default KshirsaButton;

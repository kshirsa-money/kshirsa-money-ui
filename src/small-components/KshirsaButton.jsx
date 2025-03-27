import { StyleSheet, Text, TouchableOpacity, View, Animated, Easing } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../styles/Colors';
import KshirsaButtonLoadingAnimation from '../../assets/animatedImage/KshirsaButtonLoading';
import cssUtils from '../constants/cssUtils';

const KshirsaButton = ({
    title = null,
    buttonStyle = {},
    titleStyle,
    onPress,
    icon = null, // Icon appears on the right side
    disabled = false,
    loading = false,
    width = 100, // Default width is 150
    height = 50, // Default height is 45
    customColor = ''
}) => {
    const animatedWidth = useRef(new Animated.Value(loading ? 60 : width)).current; // Initialize animated width
    const [showContent, setShowContent] = useState(!loading); // Manage content visibility

    useEffect(() => {
        if (loading) {
            setShowContent(false); // Hide content when loading starts
        } else {
            setTimeout(() => setShowContent(true), 300); // Show content after animation completes
        }

        Animated.timing(animatedWidth, {
            toValue: loading ? 60 : width, // Shrink when loading, expand when done
            duration: 300, // Smooth transition duration
            easing: Easing.inOut(Easing.ease), // Correct easing function
            useNativeDriver: false,
        }).start();
    }, [loading, width]);

    return (
        <TouchableOpacity
            style={[styles.wrapper, { height }, buttonStyle]} // Keep height fixed
            onPress={onPress}
            disabled={disabled || loading}
        >
            <Animated.View style={{ width: animatedWidth, height }}> 
                <LinearGradient
                    colors={disabled ? Colors.disabledButtonLinearGradient : loading ? Colors.buttonLoadingGradient : customColor ? customColor : Colors.buttonLinearGradient}
                    style={[styles.container, { height }]} // Apply fixed height
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                >
                    <View style={styles.touchable}>
                        {loading ? (
                            <KshirsaButtonLoadingAnimation />
                        ) : (
                            showContent && (
                                <View style={styles.contentContainer}>
                                    {title &&<Text style={[disabled ? styles.disabledText : styles.text, titleStyle]}>{title}</Text>}
                                    {icon && <View style={styles.iconContainer}>{icon}</View>}
                                </View>
                            )
                        )}
                    </View>
                </LinearGradient>
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        minHeight: 45, // Default minimum height
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
    contentContainer: {
        flexDirection: 'row', // Ensure title and icon are in a row
        alignItems: 'center', // Align items in the center
        gap: 8, // Add spacing between title and icon
    },
    iconContainer: {
        marginLeft: 5, // Add space between title and icon
    },
    text: {
        color: Colors.moodyBlack,
        fontSize: cssUtils.smallTextSize,
        fontWeight: cssUtils.bold,
    },
    disabledText: {
        color: Colors.lightGrey,
        fontSize: cssUtils.smallTextSize,
        fontWeight: cssUtils.bold,
    },
});

export default KshirsaButton;

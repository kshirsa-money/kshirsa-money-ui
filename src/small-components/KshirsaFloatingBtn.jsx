import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity, StyleSheet, Animated, View, Text, Pressable } from "react-native";
import Colors from "../styles/Colors";
import KshirsaPlusAnimation from "../../assets/animatedImage/KshirsaPlusAnimation";
import KshirsaAiSpeaker from "../../assets/animatedImage/KshirsaAiSpeaker";
import { Entypo } from "@expo/vector-icons";
import uiRoutes from "../constants/uiRoutes";

export default function KshirsaFloatingBtn({ router }) {

    // Fade animations for the first instance
    const fadeAnim1 = useRef(new Animated.Value(1)).current;
    const fadeAnim2 = useRef(new Animated.Value(0)).current;

    // Position animation for the expanded buttons
    const position1 = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const position2 = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

    const [isClicked, setIsClicked] = useState(false);
    const fadeAnimationRef = useRef(null);

    const onPress = () => {
        setIsClicked(true);

        // Stop fade animation
        if (fadeAnimationRef.current) {
            fadeAnimationRef.current.stop();
        }

        // Move the buttons outward
        Animated.parallel([
            Animated.timing(position1, {
                toValue: { x: -40, y: -80 }, // Move left & up
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(position2, {
                toValue: { x: 40, y: -80 }, // Move right & up
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const onClose = () => {
        // Hide expanded buttons & bring back the original one
        Animated.parallel([
            Animated.timing(position1, {
                toValue: { x: 0, y: 0 }, // Move back to center
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(position2, {
                toValue: { x: 0, y: 0 }, // Move back to center
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setIsClicked(false); // Reset state after animation completes
        });
    };

    useEffect(() => {
        if (isClicked) return;

        fadeAnimationRef.current = Animated.loop(
            Animated.parallel([
                Animated.sequence([
                    Animated.timing(fadeAnim1, {
                        toValue: 0,
                        duration: 3000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(fadeAnim1, {
                        toValue: 1,
                        duration: 5000,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.sequence([
                    Animated.timing(fadeAnim2, {
                        toValue: 1,
                        duration: 3000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(fadeAnim2, {
                        toValue: 0,
                        duration: 3000,
                        useNativeDriver: true,
                    }),
                ]),
            ])
        );

        fadeAnimationRef.current.start();

        return () => fadeAnimationRef.current?.stop();
    }, [isClicked]);

    const navigateAddTransaction = () => {
        router.push(uiRoutes.addTransaction);
    }
    return (
        <View style={[styles.container]}>
            {/* Overlapping animations (Before Click) */}
            {!isClicked ? (
                <TouchableOpacity style={styles.button} onPress={onPress}>
                    <Animated.View style={[styles.imageContainer, { opacity: fadeAnim1 }]}>
                        <KshirsaPlusAnimation />
                    </Animated.View>
                    <Animated.View style={[styles.imageContainer, { opacity: fadeAnim2 }]}>
                        <KshirsaAiSpeaker />
                    </Animated.View>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Entypo name="cross" size={24} color={Colors.darkGrey} />
                </TouchableOpacity>
            )}

            {/* New Positioned animations (After Click) */}
            {isClicked && (
                <>
                    <Pressable onPress={navigateAddTransaction}>
                        <Animated.View
                            style={[
                                styles.imageContainer,
                                { transform: position1.getTranslateTransform() }
                            ]}
                        >
                            <KshirsaPlusAnimation height={80} width={80} />
                        </Animated.View>
                    </Pressable>

                    <Pressable onPress={() => console.log("AI Speaker Clicked")}>
                        <Animated.View
                            style={[
                                styles.imageContainer,
                                { transform: position2.getTranslateTransform() }
                            ]}
                        >
                            <KshirsaAiSpeaker />
                        </Animated.View>
                    </Pressable>

                    {/* Close Button (X) */}
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 10,
        left: "50%",
        transform: [{ translateX: -25 }],
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: Colors.secondary,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        // borderColor: Colors.secondary,
        // borderWidth: 2,
    },
    imageContainer: {
        position: "absolute",
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
    },
    closeButton: {
        position: "absolute",
        width: 50,
        height: 50,
        borderRadius: 50,
        borderColor: Colors.darkGrey,
        borderWidth: 2,
        // backgroundColor: Colors.primary,
        alignItems: "center",
        justifyContent: "center",
        top: 5,
        left: "50%",
        transform: [{ translateX: 5 }],
        zIndex: 20,
    },
    closeText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
});

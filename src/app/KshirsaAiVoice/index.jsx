import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, TextInput, Animated, Keyboard, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { BlurView } from "expo-blur";
import Colors from "../../styles/Colors";
import voiceToTextStyles from "../../styles/stylesVoiceToText";
import KshirsaAiVoiceLogo from "../../../assets/animatedImage/KshirsaAiAnimated";
import { screenWidth } from "../../constants/utils";
import { FontAwesome, FontAwesome6, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import KshirsaAiSpeaker from "../../../assets/animatedImage/KshirsaAiSpeaker";

const VoiceToText = () => {
  const [isChatMode, setIsChatMode] = useState(false);
  const micAnim = useRef(new Animated.Value(0)).current;
  const sendAnim = useRef(new Animated.Value(1)).current;
  const inputWidth = useRef(new Animated.Value(50)).current;
  const inputTranslateX = useRef(new Animated.Value(0)).current;
  const micTranslateX = useRef(new Animated.Value(0)).current;
  const sendTranslateX = useRef(new Animated.Value(0)).current;
  
  const toggleChatMode = () => {
    if (!isChatMode) {
      setIsChatMode(true);
  
      Animated.parallel([
        // Move chat icon to center
        Animated.timing(inputTranslateX, {
          toValue: screenWidth * 0.15,
          duration: 150,
          useNativeDriver: false,
        }),
        // Expand input width
        Animated.timing(inputWidth, {
          toValue: screenWidth * 0.7, // Adjusted width to fit properly
          duration: 200,
          useNativeDriver: false,
        }),
        // Move mic to align with the expanded input
        Animated.timing(micTranslateX, {
          toValue: screenWidth * 0.15, // Adjusted value to align mic properly
          duration: 200,
          useNativeDriver: false,
        }),
        // Hide send button (slide out & fade out)
        Animated.parallel([
          Animated.timing(sendTranslateX, {
            toValue: 50, // Moves send button out of view
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(sendAnim, {
            toValue: 0, // Makes it invisible
            duration: 200,
            useNativeDriver: false,
          }),
        ]),
      ]).start();
    }
  };
  
  const toggleMic = () => {
    if (isChatMode) {
      setIsChatMode(false);
  
      Animated.parallel([
        // Shrink input width
        Animated.timing(inputWidth, {
          toValue: 50,
          duration: 200,
          useNativeDriver: false,
        }),
        // Move chat icon back to the original position
        Animated.timing(inputTranslateX, {
          toValue: 0,
          duration: 150,
          useNativeDriver: false,
        }),
        // Move mic back to original position
        Animated.timing(micTranslateX, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        // Show send button (slide in & fade in)
        Animated.parallel([
          Animated.timing(sendTranslateX, {
            toValue: 0, // Moves send button back
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(sendAnim, {
            toValue: 1, // Makes it visible again
            duration: 200,
            useNativeDriver: false,
          }),
        ]),
      ]).start();
    }
  };
  


  return (
    <SafeAreaView style={voiceToTextStyles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{flex: 1}}>
      <View style={StyleSheet.absoluteFill}>
        <LinearGradient
          colors={Colors.aiVoicePageGradient}
          start={{ x: 0.1, y: 0.2 }}
          end={{ x: 0.5, y: 0.8 }}
          style={[voiceToTextStyles.background, { opacity: 0.7 }]}
        />
        <LinearGradient
          colors={Colors.aiVoicePageGradient2}
          start={{ x: 0.7, y: 0.1 }}
          end={{ x: 0.9, y: 0.9 }}
          style={[voiceToTextStyles.background, { opacity: 0.7 }]}
        />
      </View>

      {/* Blurry Glass Panel */}
      <BlurView intensity={40} style={voiceToTextStyles.blurContainer} tint="dark">
        <View style={voiceToTextStyles.headerContainer}>
          <FontAwesome name="chevron-left" size={20} color={Colors.white} />
          <Text style={voiceToTextStyles.introduceTxt}>Introducing Kshirsa AI</Text>
          <View />
        </View>

        <Text style={voiceToTextStyles.tapTxt}>Tap mic to start recording</Text>
        {!isChatMode && <KshirsaAiVoiceLogo width={screenWidth * 0.8} height={screenWidth * 0.8} />}

        <View style={voiceToTextStyles.bottomContainer}>
          <Text style={voiceToTextStyles.exampleTxt}>Tell me what do you expends today?</Text>
          <View style={voiceToTextStyles.buttonContainer}>
            {/* Chat Button / Input */}
            <Pressable onPress={toggleChatMode}>
              <Animated.View
                style={[
                  styles.chatButton,
                  { width: inputWidth, transform: [{ translateX: inputTranslateX }] },
                ]}
              >

                {isChatMode ? (
                  <TextInput
                    style={styles.input}
                    placeholder="Type here..."
                    placeholderTextColor={Colors.white}
                  />
                ) : (
                  <Ionicons name="chatbubble-ellipses-outline" size={24} color={Colors.white} />
                )}
              </Animated.View>
            </Pressable>

            {/* Mic Button (Moves Right) */}
            <Animated.View style={{transform: [{ translateX: micTranslateX }]}}>
              <TouchableOpacity onPress={toggleMic}>
                <KshirsaAiSpeaker />
              </TouchableOpacity>
            </Animated.View>

            {/* Send Button (Hidden in Chat Mode) */}
            <Animated.View style={{ opacity: sendAnim }}>
              <TouchableOpacity style={voiceToTextStyles.button}>
                <MaterialCommunityIcons name="send-outline" size={24} color={Colors.white} />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </BlurView>
    </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  chatButton: {
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.deepMove,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "rgba(255, 255, 255, 0.1)", // Optional background
    // marginLeft: 20, // Padding from left
  },
  input: {
    flex: 1,
    color: Colors.white,
    paddingLeft: 10,
  },
});

export default VoiceToText;

import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import Colors from "../styles/Colors";
import KshirsaButton from "./KshirsaButton";

// Global function reference for triggering alert
let alertHandler = null;

const AlertComponent = () => {
  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: "",
    message: "",
    buttons: [],
    primaryAction: null,
    secondaryAction: null,
  });

  useEffect(() => {
    alertHandler = setAlertConfig;
  }, []);

  const closeModal = () => {
    setAlertConfig((prev) => ({ ...prev, visible: false }));
  };

  // Debugging visibility state
  useEffect(() => {
    console.log("🔔 Alert Visibility Updated:", alertConfig.visible);
  }, [alertConfig.visible]);

  if (!alertConfig.visible) return null;

  return (
    // <Modal 
    //   transparent 
    //   animationType="fade" 
    //   visible={alertConfig.visible} 
    //   key={alertConfig.title} // Forces re-render when title changes
    // >
      <Pressable style={styles.overlay} onPress={closeModal}>
        <View style={styles.alertBox}>
          {alertConfig.title && <Text style={styles.alertTitle}>{alertConfig.title}</Text>}
          {alertConfig.message && <Text style={styles.alertMessage}>{alertConfig.message}</Text>}
          
          <View style={styles.buttonContainer}>
            {alertConfig.buttons.map((button, index) => (
               <KshirsaButton
               key={index}
               onPress={() => {
                if (button.onPress) {
                  button.onPress();
                  closeModal();
                } else {
                  closeModal();
                }
              }}               title={button.text}
               customColor={button.style === "secondary" ? Colors.secondaryButtonLinearGradient : ""}
               loading={button.loading}
               disabled={button.disabled}
               titleStyle={button.style === "secondary" ? { color: Colors.white } : {}}
             />
            ))}
          </View>
        </View>
      </Pressable>
    // </Modal>
  );
};

// Exported function to trigger the alert
export const KshirsaAlert = {
  alert: (title, message, buttons = [{ text: "OK" }]) => {
    if (alertHandler) {
      alertHandler({
        visible: true,
        title,
        message,
        buttons,
        primaryAction: buttons[0].onPress,
        secondaryAction: buttons[1].onPress,
      });
    } else {
      console.error("❌ Alert handler is not initialized.");
    }
  },
};

// Updated Styles
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(14, 14, 14, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999, // Ensures alert is on top
  },
  alertBox: {
    width: "80%",
    backgroundColor: Colors.tabbaroverlay,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -160 }, { translateY: -100 }], // Adjusts position dynamically
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: Colors.secondary,
  },
  alertMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: Colors.white,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  button: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  defaultButton: {
    backgroundColor: Colors.secondary,
  },
  cancelButton: {
    backgroundColor: "gray",
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "bold",
  },
});

export default AlertComponent;

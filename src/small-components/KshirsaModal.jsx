import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../styles/Colors';

const KshirsaModal = ({
  isVisible,
  title,
  message,
  onClose,
  onConfirm,
  confirmText = 'Confirm',
  closeText = 'Close',
  children,
  confirmDisabled = false,
  closeDisabled = false,
}) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        {title && <Text style={styles.modalTitle}>{title}</Text>}
        {children || <Text style={styles.modalMessage}>{message}</Text>}
        <View style={[styles.buttonContainer, closeDisabled && styles.disabledBtn]}>
          <TouchableOpacity
            style={[styles.button, styles.closeButton]}
            onPress={onClose}
            disabled={closeDisabled}
          >
            <Text style={styles.buttonText}>{closeText}</Text>
          </TouchableOpacity>
          {onConfirm && (
            <TouchableOpacity
              style={[styles.button, styles.confirmButton, confirmDisabled && styles.disabledBtn]}
              onPress={onConfirm}
              disabled={confirmDisabled}
            >
              <Text style={styles.buttonText}>{confirmText}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.modalBg,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.white,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 20,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: Colors.red,
  },
  confirmButton: {
    backgroundColor: Colors.primary,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  disabledBtn: {
    opacity: 0.4,
  }
});

export default KshirsaModal;

import * as SecureStore from 'expo-secure-store';
import { ACCESS_TOKEN, DEVICE_ID, IS_SIGNUPFLOW_COMPLETE, REFRESH_TOKEN, REFRESH_TOKEN_EXPIRY_TIME } from './storageKeys';

/**
 * Save data to SecureStore.
 * @param {string} key - The key to identify the stored value.
 * @param {string | number | boolean} value - The value to store.
 */
export const setStorageData = async (key, value) => {
  try {
    if (typeof value === 'object') {
      await SecureStore.setItemAsync(key, JSON.stringify(value)); // Convert objects to strings
    } else {
      await SecureStore.setItemAsync(key, value.toString());
    }
  } catch (error) {
    console.error(`Error setting data for key "${key}":`, error);
  }
};

/**
 * Retrieve data from SecureStore.
 * @param {string} key - The key to identify the stored value.
 * @returns {string | object | null} - The stored value or null if not found.
 */
export const getStorageData = async (key) => {
  try {
    const value = await SecureStore.getItemAsync(key); // Retrieve as a string
    if (value) {
      try {
        return JSON.parse(value); // Attempt to parse JSON
      } catch {
        return value; // Return as string if not JSON
      }
    }
    return null; // Return null if no value found
  } catch (error) {
    console.error(`Error getting data for key "${key}":`, error);
    return null;
  }
};

/**
 * Remove data from SecureStore.
 * @param {string} key - The key to identify the value to remove.
 */
export const removeStorageData = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error(`Error removing data for key "${key}":`, error);
  }
};

/**
 * Check if a key exists in SecureStore.
 * @param {string} key - The key to check.
 * @returns {boolean} - True if the key exists, false otherwise.
 */
export const hasStorageKey = async (key) => {
  try {
    const value = await SecureStore.getItemAsync(key);
    return value !== null;
  } catch (error) {
    console.error(`Error checking existence of key "${key}":`, error);
    return false;
  }
};

/**
 * Clear all data from SecureStore.
 */
export const clearStorage = async () => {
  try {
    // SecureStore does not have a method to clear all, so you'll need to clear each key individually.
    const keys = [ACCESS_TOKEN, REFRESH_TOKEN, REFRESH_TOKEN_EXPIRY_TIME, IS_SIGNUPFLOW_COMPLETE];
    for (const key of keys) {
      await SecureStore.deleteItemAsync(key);
    }
    console.log('All data cleared from SecureStore.');
  } catch (error) {
    console.error('Error clearing SecureStore:', error);
  }
};

/**
 * Save authentication tokens to SecureStore.
 * @param {object} authData - The authentication data.
 */
export const setAuthTokens = async (authData) => {
  try {
    const { jwtToken, refreshToken, refreshTokenExpirationTime, isSignUpFlowCompleted } = authData;

    // Save each token in SecureStore
    await SecureStore.setItemAsync(ACCESS_TOKEN, jwtToken);
    await SecureStore.setItemAsync(REFRESH_TOKEN, refreshToken);
    await SecureStore.setItemAsync(REFRESH_TOKEN_EXPIRY_TIME, refreshTokenExpirationTime.toString());
    await SecureStore.setItemAsync(IS_SIGNUPFLOW_COMPLETE, isSignUpFlowCompleted ? '1' : '0');

    console.log('Auth tokens saved successfully.');
  } catch (error) {
    console.error('Error saving auth tokens:', error);
  }
};

/**
 * Clear authentication tokens from SecureStore.
 */
export const clearAuthTokens = async () => {
  try {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_EXPIRY_TIME);
    await SecureStore.deleteItemAsync(IS_SIGNUPFLOW_COMPLETE);

    console.log('Auth tokens cleared successfully.');
  } catch (error) {
    console.error('Error clearing auth tokens:', error);
  }
};

export const setDeviceId = async (data) => {
  try {
    await SecureStore.setItemAsync(DEVICE_ID, data);
    console.log('device id saved successfully.');
  } catch (error) {
    console.error('Error saving devoce id:', error);
  }
};

export const getDeviceId = async () => {
  try {
    const value = await SecureStore.getItemAsync(DEVICE_ID); // Retrieve as a string
    if (value) {
      try {
        return JSON.parse(value); // Attempt to parse JSON
      } catch {
        return value; // Return as string if not JSON
      }
    }
    return null; // Return null if no value found
  } catch (error) {
    return null;
  }
};

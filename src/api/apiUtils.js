import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN, REFRESH_TOKEN_EXPIRY_TIME } from '../utils/storageKeys';
import uApi from './unauthApi';
import api from './api';
import * as db from '../utils/database';
import { getStorageData, setStorageData } from '../utils/storage';
import urls from './url';
// import useDeviceId from '../hooks/useDeviceId';

export const buildQueryString = (params) => {
  return params && Object.keys(params).length > 0
  
    ? `?${new URLSearchParams(params).toString()}`
    : '';
};


export const fetchData = async (endpoint, queryParams = {}) => {
  try {
    const queryString = buildQueryString(queryParams);
    const formattedUrl = `${endpoint}${queryString}`;
    const response = await api.get(formattedUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const unAuthfetchData = async (endpoint, queryParams={}) => {
  try {
    const queryString = buildQueryString(queryParams);
    const formattedUrl = `${endpoint}${queryString}`;
    const response = await uApi.get(formattedUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching data unauth:', error.message);
    throw error;
  }
};

export const sendData = async ({endpoint, body = {}, pathParams = '', queryParams = {}, headers = {}, method='post'}) => {
  try {
    if (pathParams) {
      endpoint = `${endpoint}/${pathParams}`;
    }
    console.log(queryParams, 'headers')
    const response = await api[method](endpoint, body, {
      params: queryParams,
      headers: headers,
    });

    return response?.data;
  } catch (error) {
    console.error('Error posting data:', error?.message);
    throw error;
  }
};

export const unAuthsendData = async ({endpoint, body = {}, pathParams = '', queryParams = {}, headers = {}}) => {
  try {
    if (pathParams) {
      endpoint = `${endpoint}/${pathParams}`;
    }
    console.log(headers, 'headers')
    const response = await uApi.post(endpoint, body, {
      params: queryParams,
      headers: headers,
    });

    return response?.data;
  } catch (error) {
    console.error('Error posting data:', error?.message);
    throw error;
  }
};


export const refreshToken = async (deviceId) => {
  const refreshToken = await getStorageData(REFRESH_TOKEN)
  console.log(deviceId, 'id from refresh');
  console.log(refreshToken, 'refreshToken from refresh');
  const url = `${urls.baseUrl}/api/v1/auth/refresh?token=${refreshToken}`;
  const headers = {
    'Content-Type': 'application/json',
    'device-id': deviceId
  };

  console.log('Request Details:');
  console.log('URL:', url);
  console.log('Headers:', headers);

  try {
    console.log('Sending request...');
    const response = await axios.get(url, { headers });

    console.log('Response:', response);

    const { jwtToken, refreshTokenExpiryTime } = response?.data?.data; // Assuming the backend returns the new JWT

    setStorageData(ACCESS_TOKEN, jwtToken);
    setStorageData(REFRESH_TOKEN_EXPIRY_TIME, refreshTokenExpiryTime);

    return jwtToken;
  } catch (error) {
    console.error('Error refreshing token:', error?.response?.data);
    throw error;
  }
};

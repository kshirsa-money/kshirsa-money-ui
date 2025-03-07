// import { getBaseUrl } from "./api";

import axios from "axios";

const uApi = axios.create({
    // baseURL: 'http://192.168.31.127:8500/kshirsa',
    baseURL: 'https://kshirsa-money-backend-dev.onrender.com/kshirsa',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  uApi.interceptors.request.use(request => {
    console.log('Starting Request', request);
    return request;
});

uApi.interceptors.response.use(response => {
    console.log('Response:', response?.data);
    return response;
}, error => {
    console.log('Response Error from unauth intercepter:', error);
    return Promise.reject(error);
});

  export default uApi;
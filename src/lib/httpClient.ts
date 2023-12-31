import axios from 'axios';
import { message } from 'antd';
import { HttpResType } from '@/types/http.ts';
import { getToken } from '@/utils/index.ts';

const httpClient = axios.create({
  timeout: 10 * 1000,
});

httpClient.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${getToken()}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(response => {
  const responseData = (response.data as HttpResType) || {};
  const { errno, data, msg } = responseData;

  if (errno !== 0) {
    if (msg) {
      message.error(msg).then(() => {
        throw new Error(msg);
      });
    }
    throw new Error('Request Error');
  }

  return data as any;
});

export default httpClient;

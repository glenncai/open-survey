import axios from 'axios';
import { message } from 'antd';

export type HttpResDataType = {
  [key: string]: any;
};

export type HttpResType<T = HttpResDataType> = {
  errno: number;
  data?: T;
  msg?: string;
};

const httpClient = axios.create({
  timeout: 10 * 1000,
});

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

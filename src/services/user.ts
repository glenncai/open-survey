import httpClient from '@/lib/httpClient.ts';
import { API_PREFIX } from '@/constants/index.tsx';
import { HttpResDataType } from '@/types/http.ts';

export const getUserInfoService = async (): Promise<HttpResDataType> => {
  return (await httpClient.get(`${API_PREFIX}/user/info`)) as HttpResDataType;
};

export const registerService = async (
  username: string,
  password: string,
  nickname: string
): Promise<HttpResDataType> => {
  const body = { username, password, nickname };
  return (await httpClient.post(`${API_PREFIX}/user/register`, body)) as HttpResDataType;
};

export const loginService = async (
  username: string,
  password: string
): Promise<HttpResDataType> => {
  const body = { username, password };
  return (await httpClient.post(`${API_PREFIX}/user/login`, body)) as HttpResDataType;
};

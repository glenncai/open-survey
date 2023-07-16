import CryptoJS from 'crypto-js';
import { stringify, parse } from 'flatted';
import {
  HOME_PATHNAME,
  LOGIN_PATHNAME,
  REGISTER_PATHNAME,
  USER_TOKEN,
} from '@/constants/index.tsx';

export const encryptData = (content: unknown, salt: string): string => {
  return CryptoJS.AES.encrypt(stringify({ content }), salt).toString();
};

export const decryptData = (cipherText: string, salt: string): unknown => {
  return parse(CryptoJS.AES.decrypt(cipherText, salt).toString(CryptoJS.enc.Utf8)).content;
};

export const setToken = (token: string): void => {
  localStorage.setItem(USER_TOKEN, token);
};

export const getToken = (): string => {
  return localStorage.getItem(USER_TOKEN) || '';
};

export const removeToken = (): void => {
  localStorage.removeItem(USER_TOKEN);
};

export const isCurrentAuthPath = (pathName: string): boolean => {
  return [LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathName);
};

export const isNoNeedUserInfoPath = (pathName: string): boolean => {
  return [HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathName);
};

import CryptoJS from 'crypto-js';
import { stringify, parse } from 'flatted';

export const encryptData = (content: unknown, salt: string): string => {
  return CryptoJS.AES.encrypt(stringify({ content }), salt).toString();
};

export const decryptData = (cipherText: string, salt: string): unknown => {
  return parse(CryptoJS.AES.decrypt(cipherText, salt).toString(CryptoJS.enc.Utf8)).content;
};

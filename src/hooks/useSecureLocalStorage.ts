import { useLocalStorageState } from 'ahooks';
import { encryptData, decryptData } from '@/utils/index.ts';

const useSecureLocalStorage = <T>(key: string, defaultVal: T) => {
  const salt = import.meta.env.VITE_SALT;
  const [state, setState] = useLocalStorageState(key, {
    defaultValue: defaultVal,
    serializer: (value: T) => encryptData(value, salt),
    deserializer: (value: string) => decryptData(value, salt) as T,
  });

  return [state, setState] as const;
};

export default useSecureLocalStorage;

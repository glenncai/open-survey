import { useAppSelector } from '@/store/hooks/useAppSelector.ts';

const useGetUserInfo = () => {
  const { username, nickname } = useAppSelector(state => state.users);
  return { username, nickname };
};

export default useGetUserInfo;

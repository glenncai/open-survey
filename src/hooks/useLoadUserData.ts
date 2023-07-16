import { useAppDispatch } from '@/store/hooks/useAppDispatch.ts';
import { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { getUserInfoService } from '@/services/user.ts';
import { loginReducer } from '@/store/features/user/usersSlice.ts';
import useGetUserInfo from '@/hooks/useGetUserInfo.ts';

const useLoadUserData = () => {
  const dispatch = useAppDispatch();
  const [waitingUserData, setWaitingUserData] = useState(true);

  // Load user data from service
  const { run: runGetUserInfoService } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result;
      dispatch(loginReducer({ username, nickname }));
    },
    onFinally() {
      setWaitingUserData(false);
    },
  });

  // To determine if the user data exists in redux store
  const { username } = useGetUserInfo();
  useEffect(() => {
    if (username) {
      setWaitingUserData(false);
      return;
    }
    runGetUserInfoService();
  }, [runGetUserInfoService, username]);

  return { waitingUserData };
};

export default useLoadUserData;

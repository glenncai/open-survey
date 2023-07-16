import useGetUserInfo from '@/hooks/useGetUserInfo.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { isCurrentAuthPath, isNoNeedUserInfoPath } from '@/utils/index.ts';
import { LOGIN_PATHNAME, MANAGE_LIST_PATHNAME } from '@/constants/index.tsx';

const useNavigatePage = (waitingUserData: boolean) => {
  const navigate = useNavigate();
  const { username } = useGetUserInfo();
  const { pathname } = useLocation();

  useEffect(() => {
    if (waitingUserData) {
      return;
    }

    if (username) {
      if (isCurrentAuthPath(pathname)) {
        navigate(MANAGE_LIST_PATHNAME);
      }
      return;
    }

    if (isNoNeedUserInfoPath(pathname)) {
      return;
    }

    navigate(LOGIN_PATHNAME);
  }, [navigate, pathname, username, waitingUserData]);
};

export default useNavigatePage;

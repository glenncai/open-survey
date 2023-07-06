import { FC } from 'react';
import { LOGIN_PATHNAME } from '@/constants/index.tsx';
import { Link } from 'react-router-dom';

const UserInfo: FC = () => {
  return (
    <>
      <Link to={LOGIN_PATHNAME}>Login</Link>
    </>
  );
};

export default UserInfo;

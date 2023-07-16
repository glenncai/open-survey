import styles from './UserInfo.module.scss';
import { FC } from 'react';
import { LOGIN_PATHNAME } from '@/constants/index.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Space, Dropdown, MenuProps, message } from 'antd';
import { removeToken } from '@/utils/index.ts';
import useGetUserInfo from '@/hooks/useGetUserInfo.ts';
import { useAppDispatch } from '@/store/hooks/useAppDispatch.ts';
import { logoutReducer } from '@/store/features/user/usersSlice.ts';

const UserInfo: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { username, nickname } = useGetUserInfo();
  const [messageApi, contextHolder] = message.useMessage();

  const items: MenuProps['items'] = [
    {
      key: 'logout',
      label: <a>Logout</a>,
      onClick: handleLogout,
    },
  ];

  function handleLogout() {
    messageApi.success('Logout successfully, redirecting to login page...').then(() => {
      dispatch(logoutReducer());
      removeToken();
      navigate(LOGIN_PATHNAME);
    });
  }

  const UserInfo = (
    <>
      <Dropdown menu={{ items }} trigger={['click']} placement="bottom">
        <span className={styles.userText}>
          {contextHolder}
          <Space direction="horizontal">
            <UserOutlined />
            {nickname}
          </Space>
        </span>
      </Dropdown>
    </>
  );

  const Login = <Link to={LOGIN_PATHNAME}>Login</Link>;

  return <div>{username ? UserInfo : Login}</div>;
};

export default UserInfo;

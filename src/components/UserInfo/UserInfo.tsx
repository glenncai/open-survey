import styles from './UserInfo.module.scss';
import { FC } from 'react';
import { LOGIN_PATHNAME } from '@/constants/index.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { getUserInfoService } from '@/services/user.ts';
import { UserOutlined } from '@ant-design/icons';
import { Space, Dropdown, MenuProps, message } from 'antd';
import { removeToken } from '@/utils/index.ts';

const UserInfo: FC = () => {
  const navigate = useNavigate();
  const { data } = useRequest(getUserInfoService);
  const { username, nickname } = data || {};
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

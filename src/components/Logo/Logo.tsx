import styles from './Logo.module.scss';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Space, Typography } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import useGetUserInfo from '@/hooks/useGetUserInfo.ts';
import { HOME_PATHNAME, MANAGE_LIST_PATHNAME } from '@/constants/index.tsx';

const { Title } = Typography;

const Logo: FC = () => {
  const { username } = useGetUserInfo();
  const [pathName, setPathName] = useState<string>(HOME_PATHNAME);

  useEffect(() => {
    username && setPathName(MANAGE_LIST_PATHNAME);
  }, [username]);

  return (
    <div className={styles.container}>
      <Link to={pathName}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>OPEN SURVEY</Title>
        </Space>
      </Link>
    </div>
  );
};

export default Logo;

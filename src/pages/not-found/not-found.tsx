import { FC } from 'react';
import styles from './not-found.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';
import { MANAGE_LIST_PATHNAME } from '@/constants/index.tsx';

const NotFound: FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" size="large" onClick={() => navigate(MANAGE_LIST_PATHNAME)}>
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;

import { FC } from 'react';
import styles from './Loading.module.scss';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const loadingIcon = <LoadingOutlined style={{ fontSize: 32 }} spin />;

const Loading: FC = () => {
  return (
    <div className={styles.container}>
      <Spin indicator={loadingIcon} />
    </div>
  );
};

export default Loading;

import styles from './EditHeader.module.scss';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Space } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

const { Title } = Typography;

const EditHeader: FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space className={styles.leftSpaceContainer}>
            <Button
              className={styles.backButton}
              type="link"
              icon={<LeftOutlined />}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
            <Title level={1}>Survey Title</Title>
          </Space>
        </div>
        <div className={styles.main}>Main</div>
        <div className={styles.right}>
          <Space>
            <Button type="default">Save</Button>
            <Button type="primary">Publish</Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;

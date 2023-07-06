import { FC } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import styles from './ManageLayout.module.scss';
import { Button, Space, Divider, message } from 'antd';
import { BarsOutlined, DeleteOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons';
import { createSurveyService } from '@/services/survey.ts';
import { useRequest } from 'ahooks';

const ManageLayout: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [messageApi, contextHolder] = message.useMessage();
  const { loading, run: handleCreateQuestion } = useRequest(createSurveyService, {
    manual: true,
    onSuccess: result => {
      const { id } = result || {};
      if (id) {
        messageApi.success('Create survey successfully').then(() => {
          navigate(`/survey/edit/${id}`);
        });
      }
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical" size="small">
          {contextHolder}
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            className={styles.buttonFullWidth}
            onClick={handleCreateQuestion}
            loading={loading}
          >
            Create survey
          </Button>
          <Divider />
          <Button
            type={location.pathname === '/manage/list' ? 'default' : 'text'}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => navigate('/manage/list')}
            className={styles.buttonFullWidth}
          >
            My survey
          </Button>
          <Button
            type={location.pathname === '/manage/star' ? 'default' : 'text'}
            size="large"
            icon={<StarOutlined />}
            onClick={() => navigate('/manage/star')}
            className={styles.buttonFullWidth}
          >
            Star survey
          </Button>
          <Button
            type={location.pathname === '/manage/trash' ? 'default' : 'text'}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => navigate('/manage/trash')}
            className={styles.buttonFullWidth}
          >
            Recycle Bin
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  );
};

export default ManageLayout;

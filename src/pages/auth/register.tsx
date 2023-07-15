import { FC } from 'react';
import styles from './common.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Form, Input, Button, Space, message } from 'antd';
import { LOGIN_PATHNAME } from '@/constants/index.tsx';
import { registerService } from '@/services/user.ts';
import { useRequest } from 'ahooks';

const { Title } = Typography;

interface RegisterFormValues {
  username: string;
  password: string;
  confirmPassword: string;
  nickname: string;
}

const Register: FC = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  async function handleRegister(values: RegisterFormValues) {
    const { username, password, nickname } = values;
    await registerService(username, password, nickname);
  }

  function onFinish(values: RegisterFormValues) {
    runRegister(values);
  }

  const { run: runRegister } = useRequest((values: RegisterFormValues) => handleRegister(values), {
    manual: true,
    onSuccess() {
      messageApi.success('Register successfully').then(() => {
        navigate(LOGIN_PATHNAME);
      });
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        {contextHolder}
        <Title level={2}>Create an account</Title>
        <Form layout="vertical" autoComplete="off" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: 'Username is required' },
              {
                type: 'string',
                min: 5,
                max: 20,
                message: 'Username must be 5-20 characters in length',
              },
              {
                pattern: /^\w+$/,
                message: 'Only accept English letters, numbers, and underscore (_)',
              },
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Password is required' },
              {
                type: 'string',
                min: 8,
                message: 'Password must be at least 8 characters in length',
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Confirm password is required' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item
            label="Nick Name"
            name="nickname"
            rules={[{ required: true, message: 'Nick name is required' }]}
          >
            <Input placeholder="Nick Name" />
          </Form.Item>
          <Form.Item>
            <Space direction="vertical" className={styles.buttonContainer}>
              <Button type="primary" htmlType="submit">
                Sign Up
              </Button>
              <Link to={LOGIN_PATHNAME}>Already have an account? Log in.</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;

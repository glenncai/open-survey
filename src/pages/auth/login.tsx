import { FC, useEffect } from 'react';
import styles from './common.module.scss';
import { Link } from 'react-router-dom';
import { Typography, Form, Input, Button, Space, Checkbox } from 'antd';
import { REGISTER_PATHNAME, LOGIN_USERNAME, LOGIN_PASSWORD } from '@/constants/index.tsx';
import useSecureLocalStorage from '@/hooks/useSecureLocalStorage.ts';

const { Title } = Typography;

interface LoginFormValues {
  username: string;
  password: string;
  remember: boolean;
}

const Login: FC = () => {
  const [form] = Form.useForm();
  const [username, setUsername] = useSecureLocalStorage(LOGIN_USERNAME, '');
  const [password, setPassword] = useSecureLocalStorage(LOGIN_PASSWORD, '');

  useEffect(() => {
    if (username && password) {
      form.setFieldsValue({ username, password });
    } else {
      form.setFieldsValue({ username: '', password: '' });
    }
  }, [username, password, form]);

  function onFinish(values: LoginFormValues) {
    const { username, password, remember } = values || {};

    if (remember) {
      setUsername(username);
      setPassword(password);
    } else {
      setUsername(undefined);
      setPassword(undefined);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <Title level={2}>Welcome Back!</Title>
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Username is required' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Password is required' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" className={styles.remember}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Space direction="vertical" className={styles.buttonContainer}>
              <Button type="primary" htmlType="submit">
                Log in
              </Button>
              <Link to={REGISTER_PATHNAME}>Not a member? Sign up.</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;

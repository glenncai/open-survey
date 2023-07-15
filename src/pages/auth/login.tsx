import { FC, useEffect } from 'react';
import styles from './common.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Form, Input, Button, Space, Checkbox, message } from 'antd';
import {
  REGISTER_PATHNAME,
  LOGIN_USERNAME,
  LOGIN_PASSWORD,
  MANAGE_LIST_PATHNAME,
} from '@/constants/index.tsx';
import useSecureLocalStorage from '@/hooks/useSecureLocalStorage.ts';
import { loginService } from '@/services/user.ts';
import { useRequest } from 'ahooks';
import { setToken } from '@/utils/index.ts';

const { Title } = Typography;

interface LoginFormValues {
  username: string;
  password: string;
  remember: boolean;
}

const Login: FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [username, setUsername] = useSecureLocalStorage(LOGIN_USERNAME, '');
  const [password, setPassword] = useSecureLocalStorage(LOGIN_PASSWORD, '');

  useEffect(() => {
    if (username && password) {
      form.setFieldsValue({ username, password });
    } else {
      form.setFieldsValue({ username: '', password: '' });
    }
  }, [username, password, form]);

  async function handleLogin(values: LoginFormValues) {
    const { username, password } = values;
    return await loginService(username, password);
  }

  function onFinish(values: LoginFormValues) {
    const { username, password, remember } = values || {};

    if (remember) {
      setUsername(username);
      setPassword(password);
    } else {
      setUsername(undefined);
      setPassword(undefined);
    }

    runLogin(values);
  }

  const { run: runLogin } = useRequest((values: LoginFormValues) => handleLogin(values), {
    manual: true,
    onSuccess(result) {
      const { token = '' } = result;
      messageApi
        .success('Login successfully, redirecting to manage list page...')
        .then(() => {
          setToken(token);
        })
        .then(() => {
          navigate(MANAGE_LIST_PATHNAME);
        });
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        {contextHolder}
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

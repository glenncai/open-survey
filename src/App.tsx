import { RouterProvider } from 'react-router-dom';
import router from '@/router/index.tsx';
import { ConfigProvider } from 'antd';

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#5d9b84',
        },
      }}
    >
      <RouterProvider router={router}></RouterProvider>
    </ConfigProvider>
  );
};

export default App;

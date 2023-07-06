import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '@/layouts/MainLayout/MainLayout.tsx';
import ManageLayout from '@/layouts/ManageLayout/ManageLayout.tsx';
import SurveyLayout from '@/layouts/SurveyLayout/SurveyLayout.tsx';
import Home from '@/pages/home/home.tsx';
import Login from '@/pages/auth/login.tsx';
import Register from '@/pages/auth/register.tsx';
import List from '@/pages/manage/list.tsx';
import Trash from '@/pages/manage/trash.tsx';
import Star from '@/pages/manage/star.tsx';
import Edit from '@/pages/survey/edit';
import Stat from '@/pages/survey/stat';
import NotFound from '@/pages/not-found/not-found.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          {
            path: 'list',
            element: <List />,
          },
          {
            path: 'star',
            element: <Star />,
          },
          {
            path: 'trash',
            element: <Trash />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: 'survey',
    element: <SurveyLayout />,
    children: [
      {
        path: 'edit/:id',
        element: <Edit />,
      },
      {
        path: 'stat/:id',
        element: <Stat />,
      },
    ],
  },
]);

export default router;

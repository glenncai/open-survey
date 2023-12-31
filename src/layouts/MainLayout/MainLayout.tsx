import { FC } from 'react';
import styles from './MainLayout.module.scss';
import { GITHUB_PATHNAME } from '@/constants/index.tsx';
import { Outlet, Link } from 'react-router-dom';
import { Layout } from 'antd';
import Logo from '@/components/Logo/Logo.tsx';
import UserInfo from '@/components/UserInfo/UserInfo.tsx';
import Loading from '@/components/Loading/Loading.tsx';
import useLoadUserData from '@/hooks/useLoadUserData.ts';
import useNavigatePage from '@/hooks/useNavigatePage.ts';

const { Header, Footer, Content } = Layout;

const MainLayout: FC = () => {
  const { waitingUserData } = useLoadUserData();
  useNavigatePage(waitingUserData);

  return (
    <Layout>
      <Header className={styles.header}>
        <div>
          <Logo />
        </div>
        <div>
          <UserInfo />
        </div>
      </Header>
      <Content className={styles.main}>{waitingUserData ? <Loading /> : <Outlet />}</Content>
      <Footer className={styles.footer}>
        <div className={styles.up}>Made with ❤️ by</div>
        <Link to={GITHUB_PATHNAME} target="_blank" className={styles.down}>
          Glenn Cai
        </Link>
      </Footer>
    </Layout>
  );
};

export default MainLayout;

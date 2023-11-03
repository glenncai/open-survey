import styles from './SurveyLayout.module.scss';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Loading from '@/components/Loading/Loading.tsx';
import useLoadUserData from '@/hooks/useLoadUserData.ts';
import useNavigatePage from '@/hooks/useNavigatePage.ts';

const SurveyLayout: FC = () => {
  const { waitingUserData } = useLoadUserData();
  useNavigatePage(waitingUserData);

  return <div className={styles.container}>{waitingUserData ? <Loading /> : <Outlet />}</div>;
};

export default SurveyLayout;

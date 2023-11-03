import styles from './index.module.scss';
import { FC } from 'react';
import useLoadSurveyData from '@/hooks/useLoadSurveyData.ts';
import EditCanvas from '@/pages/survey/edit/EditCanvas/EditCanvas.tsx';
import LeftPanel from '@/pages/survey/edit/LeftPanel/LeftPanel.tsx';
import RightPanel from '@/pages/survey/edit/RightPanel/RightPanel.tsx';
import { useAppDispatch } from '@/store/hooks/useAppDispatch.ts';
import { changeSelectedId } from '@/store/features/component/componentsSlice.ts';

const Edit: FC = () => {
  const dispatch = useAppDispatch();
  const { loading } = useLoadSurveyData();

  const clearSelectedId = () => {
    dispatch(changeSelectedId(''));
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>Header</div>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles.canvasWrapper}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;

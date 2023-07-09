import { FC, useMemo } from 'react';
import styles from './common.module.scss';
import { Typography, Empty } from 'antd';
import SurveyCard from '@/components/SurveyCard/SurveyCard.tsx';
import ListSearch from '@/components/ListSearch/ListSearch.tsx';
import Loading from '@/components/Loading/Loading.tsx';
import useLoadMoreSurveyListData from '@/hooks/useLoadMoreSurveyListData.ts';

const { Title } = Typography;

const List: FC = () => {
  const { containerRef, startLoading, surveyList, surveyListTotal, isMoreSurveyListData, loading } =
    useLoadMoreSurveyListData({});

  const LoadMoreElement = useMemo(() => {
    if (!startLoading || loading) {
      return <Loading />;
    }
    if (surveyListTotal === 0) {
      return <Empty description="No survey" />;
    }
    if (!isMoreSurveyListData) {
      return <span>No more survey</span>;
    }
  }, [isMoreSurveyListData, loading, startLoading, surveyListTotal]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>My Surveys</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {surveyList.length > 0 &&
          surveyList.map((survey: any) => <SurveyCard key={survey._id} {...survey} />)}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreElement}</div>
      </div>
    </>
  );
};

export default List;

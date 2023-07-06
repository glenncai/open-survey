import { FC } from 'react';
import styles from './common.module.scss';
import { Typography, Empty } from 'antd';
import SurveyCard from '@/components/SurveyCard/SurveyCard.tsx';
import ListPagination from '@/components/ListPagination/ListPagination.tsx';
import ListSearch from '@/components/ListSearch/ListSearch.tsx';
import Loading from '@/components/Loading/Loading.tsx';
import useLoadSurveyListData from '@/hooks/useLoadSurveyListData.ts';

const { Title } = Typography;

const List: FC = () => {
  const { data = {}, loading } = useLoadSurveyListData({});
  const { list: surveyList = [], total = 0 } = data;

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
        {loading && <Loading />}
        {!loading && surveyList.length === 0 && <Empty description="No survey" />}
        {!loading &&
          surveyList.length > 0 &&
          surveyList.map((survey: any) => <SurveyCard key={survey._id} {...survey} />)}
      </div>
      <div className={styles.footer}>
        <ListPagination total={total} />
      </div>
    </>
  );
};

export default List;

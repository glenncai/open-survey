import { FC } from 'react';
import useLoadSurveyData from '@/hooks/useLoadSurveyData.ts';

const Stat: FC = () => {
  const { loading, data } = useLoadSurveyData();

  return (
    <div>
      <p>Stat Page</p>
      {loading ? <p>loading...</p> : <p>{JSON.stringify(data)}</p>}
    </div>
  );
};

export default Stat;

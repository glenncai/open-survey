import { FC } from 'react';
import useLoadSurveyData from '@/hooks/useLoadSurveyData.ts';

const Edit: FC = () => {
  const { loading, data } = useLoadSurveyData();

  return (
    <div>
      <p>Edit Page</p>
      {loading ? <p>loading...</p> : <p>{JSON.stringify(data)}</p>}
    </div>
  );
};

export default Edit;

import { useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { getSurveyService } from '@/services/survey.ts';

export type SurveyParamsType = {
  id: string;
};

const useLoadSurveyData = () => {
  const { id = '' } = useParams<SurveyParamsType>();

  async function loadSurveyData() {
    return await getSurveyService(id);
  }

  const { data, loading, error } = useRequest(loadSurveyData);

  return { data, loading, error };
};

export default useLoadSurveyData;

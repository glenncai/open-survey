import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { getSurveyService } from '@/services/survey.ts';
import { useAppDispatch } from '@/store/hooks/useAppDispatch.ts';
import { resetComponents } from '@/store/features/component/componentsSlice.ts';

export type SurveyParamsType = {
  id: string;
};

const useLoadSurveyData = () => {
  const { id = '' } = useParams<SurveyParamsType>();
  const dispatch = useAppDispatch();

  async function callGetSurveyService() {
    if (!id) {
      throw new Error('Survey id is required.');
    }
    return await getSurveyService(id);
  }

  const { run, data, loading, error } = useRequest(callGetSurveyService, {
    manual: true,
  });

  useEffect(() => {
    run();
  }, [id, run]);

  useEffect(() => {
    if (!data) {
      return;
    }

    const { componentList = [] } = data;

    // Set default selected component
    let selectedId = '';
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id;
    }
    console.log(componentList[0]);
    console.log(selectedId);

    // Save the componentList to the redux store.
    dispatch(resetComponents({ componentList, selectedId }));
  }, [data, dispatch]);

  return { loading, error };
};

export default useLoadSurveyData;

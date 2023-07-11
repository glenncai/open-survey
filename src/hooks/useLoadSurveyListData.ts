import { useSearchParams } from 'react-router-dom';
import { getSurveyListService } from '@/services/survey.ts';
import { useRequest } from 'ahooks';
import {
  LIST_DEFAULT_PAGE,
  LIST_DEFAULT_PAGE_SIZE,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_SEARCH_PARAM_KEY,
} from '@/constants/index.tsx';

type SurveyOptionsType = {
  isStarred: boolean;
  isDeleted: boolean;
};

const useLoadSurveyListData = (opts: Partial<SurveyOptionsType>) => {
  const { isStarred, isDeleted } = opts;
  const [searchParams] = useSearchParams();

  async function loadSurveyListData() {
    const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
    const page = +(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || LIST_DEFAULT_PAGE;
    const pageSize = +(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_DEFAULT_PAGE_SIZE;

    return await getSurveyListService({ keyword, isStarred, isDeleted, page, pageSize });
  }

  const { data, loading, error, refresh } = useRequest(loadSurveyListData, {
    refreshDeps: [searchParams],
  });

  return { data, loading, error, refresh };
};

export default useLoadSurveyListData;

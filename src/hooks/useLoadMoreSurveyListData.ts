import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LIST_DEFAULT_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '@/constants/index.tsx';
import { useDebounceFn, useRequest } from 'ahooks';
import { getSurveyListService } from '@/services/survey.ts';

type LoadMoreSurveyOptionsType = {
  isStarred: boolean;
};

const useLoadMoreSurveyListData = (opts: Partial<LoadMoreSurveyOptionsType>) => {
  const { isStarred } = opts;
  const [searchParams] = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const [startLoading, setStartLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [surveyList, setSurveyList] = useState<any[]>([]);
  const [surveyListTotal, setSurveyListTotal] = useState<number>(0);
  const isMoreSurveyListData = surveyListTotal > surveyList.length;
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';

  async function loadSurveyListData() {
    return await getSurveyListService({
      page,
      pageSize: LIST_DEFAULT_PAGE_SIZE,
      keyword,
      isStarred,
    });
  }

  function loadMoreSurveyListData() {
    const loadMoreElement = containerRef.current;
    if (loadMoreElement === null) {
      return;
    }

    const domRect = loadMoreElement.getBoundingClientRect();
    if (domRect === null) {
      return;
    }

    const { bottom } = domRect;
    if (bottom <= document.body.clientHeight) {
      loadSurveyListDataAction();
      setStartLoading(true);
    }
  }

  const { run: loadSurveyListDataAction, loading } = useRequest(loadSurveyListData, {
    manual: true,
    onSuccess: result => {
      const { list: newSurveyList = [], total = 0 } = result;
      setSurveyList([...surveyList, ...newSurveyList]);
      setSurveyListTotal(total);
      setPage(page + 1);
    },
  });

  const { run: loadMoreSurveyListDataAction } = useDebounceFn(loadMoreSurveyListData, {
    wait: 1000,
  });

  useEffect(() => {
    setStartLoading(false);
    setPage(1);
    setSurveyList([]);
    setSurveyListTotal(0);
  }, [keyword]);

  useEffect(() => {
    loadMoreSurveyListDataAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    if (isMoreSurveyListData) {
      window.addEventListener('scroll', loadMoreSurveyListDataAction);
    }

    return () => {
      window.removeEventListener('scroll', loadMoreSurveyListDataAction);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, isMoreSurveyListData]);

  return {
    containerRef,
    startLoading,
    surveyList,
    surveyListTotal,
    isMoreSurveyListData,
    loading,
  };
};

export default useLoadMoreSurveyListData;

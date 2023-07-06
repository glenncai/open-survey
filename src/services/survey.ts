import httpClient, { HttpResDataType } from '@/lib/httpClient.ts';
import { API_PREFIX } from '@/constants/index.tsx';

type SurveySearchType = {
  keyword: string;
  isStarred: boolean;
  isDeleted: boolean;
  page: number;
  pageSize: number;
};

export const getSurveyService = async (id: string): Promise<HttpResDataType> => {
  return (await httpClient.get(`${API_PREFIX}/survey/${id}`)) as HttpResDataType;
};

export const createSurveyService = async (): Promise<HttpResDataType> => {
  return (await httpClient.post(`${API_PREFIX}/survey`)) as HttpResDataType;
};

export const getSurveyListService = async (
  opts: Partial<SurveySearchType> = {}
): Promise<HttpResDataType> => {
  return (await httpClient.get(`${API_PREFIX}/survey`, { params: opts })) as HttpResDataType;
};

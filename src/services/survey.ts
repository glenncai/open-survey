import httpClient from '@/lib/httpClient.ts';
import { API_PREFIX } from '@/constants/index.tsx';
import { HttpResDataType } from '@/types/http.ts';
import { SurveySearchType } from '@/types/survey.ts';

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

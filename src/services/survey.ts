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

export const updateSurveyService = async (
  id: string,
  opts: { [key: string]: any }
): Promise<HttpResDataType> => {
  return (await httpClient.patch(`${API_PREFIX}/survey/${id}`, opts)) as HttpResDataType;
};

export const duplicateSurveyService = async (id: string): Promise<HttpResDataType> => {
  return (await httpClient.post(`${API_PREFIX}/survey/duplicate/${id}`)) as HttpResDataType;
};

export const deleteSurveyService = async (ids: string[]): Promise<HttpResDataType> => {
  return (await httpClient.delete(`${API_PREFIX}/survey`, { data: { ids } })) as HttpResDataType;
};

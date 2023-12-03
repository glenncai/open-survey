export type SurveyTitlePropsType = {
  text?: string;
  level?: 1 | 2 | 3 | 4 | 5;
  isCenter?: boolean;
  disabled?: boolean;
  onChange?: (newProps: SurveyTitlePropsType) => void;
};

export const SurveyDefaultTitleProps: SurveyTitlePropsType = {
  text: 'Survey Title',
  level: 1,
  isCenter: false,
};

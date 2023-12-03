export type SurveyInputPropsType = {
  title?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (newProps: SurveyInputPropsType) => void;
};

export const SurveyDefaultInputProps: SurveyInputPropsType = {
  title: 'Survey Input',
  placeholder: 'This is a placeholder...',
};

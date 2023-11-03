import Component from './SurveyInput.tsx';
import PropComponent from './PropComponent.tsx';
import { SurveyDefaultInputProps } from './type.ts';

export * from './type.ts';

export default {
  title: 'Survey Input',
  type: 'surveyInput',
  Component,
  PropComponent,
  defaultProps: SurveyDefaultInputProps,
};

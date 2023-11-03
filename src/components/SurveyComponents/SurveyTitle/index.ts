import Component from './SurveyTitle.tsx';
import PropComponent from './PropComponent.tsx';
import { SurveyDefaultTitleProps } from './type.ts';

export * from './type.ts';

export default {
  title: 'Survey Title',
  type: 'surveyTitle',
  Component,
  PropComponent,
  defaultProps: SurveyDefaultTitleProps,
};

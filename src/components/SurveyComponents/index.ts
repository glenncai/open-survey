import { FC } from 'react';
import SurveyInputConf, { SurveyInputPropsType } from '@/components/SurveyComponents/SurveyInput';
import SurveyTitleConf, { SurveyTitlePropsType } from '@/components/SurveyComponents/SurveyTitle';

type ComponentConfGroupType = {
  groupId: string;
  groupName: string;
  components: ComponentConfType[];
};

// Component props type
export type ComponentPropsType = SurveyInputPropsType & SurveyTitlePropsType;

// Component config type
export type ComponentConfType = {
  title: string;
  type: string;
  Component: FC<ComponentPropsType>;
  PropComponent: FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
};

// Assign component group
export const componentConfGroup: ComponentConfGroupType[] = [
  {
    groupId: 'textGroup',
    groupName: 'Typography',
    components: [SurveyTitleConf],
  },
  {
    groupId: 'inputGroup',
    groupName: 'Input',
    components: [SurveyInputConf],
  },
];

// All components config
const componentConfigList: ComponentConfType[] = [SurveyInputConf, SurveyTitleConf];

export function getComponentConfByType(type: string) {
  return componentConfigList.find(c => c.type === type);
}

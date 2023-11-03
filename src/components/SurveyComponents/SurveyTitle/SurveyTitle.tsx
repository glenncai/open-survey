import { FC } from 'react';
import { Typography } from 'antd';
import { SurveyDefaultTitleProps, SurveyTitlePropsType } from './type.ts';

const { Title } = Typography;

const SurveyTitle: FC<SurveyTitlePropsType> = (props: SurveyTitlePropsType) => {
  const { text = '', level = 1, isCenter = false } = { ...SurveyDefaultTitleProps, ...props };

  const genFontSize = (level: number) => {
    switch (level) {
      case 1:
        return '24px';
      case 2:
        return '20px';
      case 3:
        return '16px';
      default:
        return '16px';
    }
  };

  return (
    <Title
      level={level}
      style={{
        textAlign: isCenter ? 'center' : 'start',
        marginBottom: 0,
        fontSize: genFontSize(level),
      }}
    >
      {text}
    </Title>
  );
};

export default SurveyTitle;

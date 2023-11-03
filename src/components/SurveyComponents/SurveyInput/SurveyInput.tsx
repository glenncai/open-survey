import { FC } from 'react';
import { Typography, Input } from 'antd';
import { SurveyDefaultInputProps, SurveyInputPropsType } from './type.ts';

const { Paragraph } = Typography;

const SurveyInput: FC<SurveyInputPropsType> = (props: SurveyInputPropsType) => {
  const { title = '', placeholder = '' } = { ...SurveyDefaultInputProps, ...props };

  return (
    <div>
      <Paragraph strong={true}>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder} />
      </div>
    </div>
  );
};

export default SurveyInput;

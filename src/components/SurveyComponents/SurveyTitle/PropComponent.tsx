import { FC, useEffect } from 'react';
import { Checkbox, Form, Input, Select } from 'antd';
import { SurveyTitlePropsType } from '@/components/SurveyComponents/SurveyTitle/type.ts';

const PropComponent: FC<SurveyTitlePropsType> = (props: SurveyTitlePropsType) => {
  const { text, level, isCenter, onChange } = props;
  const [form] = Form.useForm();

  const handleFormValuesChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  };

  useEffect(() => {
    form.setFieldsValue({ text, level, isCenter });
  }, [form, isCenter, level, text]);

  return (
    <Form form={form} layout="vertical" onValuesChange={handleFormValuesChange}>
      <Form.Item
        label="Text"
        name="text"
        rules={[{ required: true, message: 'Please enter title...' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Level" name="level">
        <Select
          options={[
            { value: 1, label: '1' },
            { value: 2, label: '2' },
            { value: 3, label: '3' },
          ]}
        ></Select>
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>Center</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;

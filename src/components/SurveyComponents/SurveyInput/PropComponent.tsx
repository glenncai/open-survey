import { FC, useEffect } from 'react';
import { Form, Input } from 'antd';
import { SurveyInputPropsType } from '@/components/SurveyComponents/SurveyInput/type.ts';

const PropComponent: FC<SurveyInputPropsType> = (props: SurveyInputPropsType) => {
  const { title, placeholder, onChange } = props;
  const [form] = Form.useForm();

  const handleFormValuesChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  };

  useEffect(() => {
    form.setFieldsValue({ title, placeholder });
  }, [form, placeholder, title]);

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, placeholder }}
      onValuesChange={handleFormValuesChange}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please enter title...' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Placeholder" name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default PropComponent;

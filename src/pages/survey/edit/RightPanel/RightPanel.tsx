import { FC } from 'react';
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import ComponentProp from '@/pages/survey/edit/RightPanel/ComponentProp.tsx';

const RightPanel: FC = () => {
  const tabsItem = [
    {
      key: 'attributes',
      label: (
        <span>
          <FileTextOutlined />
          Attributes
        </span>
      ),
      children: <ComponentProp />,
    },
    {
      key: 'settings',
      label: (
        <span>
          <SettingOutlined />
          Settings
        </span>
      ),
      children: <div>Settings</div>,
    },
  ];

  return <Tabs defaultActiveKey="attributes" items={tabsItem} />;
};

export default RightPanel;

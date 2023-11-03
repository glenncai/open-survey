import { FC } from 'react';
import { Tabs } from 'antd';
import { AppstoreAddOutlined, BarsOutlined } from '@ant-design/icons';
import ComponentLib from '@/pages/survey/edit/LeftPanel/ComponentLib.tsx';
import Layers from '@/pages/survey/edit/LeftPanel/Layers.tsx';

const LeftPanel: FC = () => {
  const tabsItem = [
    {
      key: 'componentLib',
      label: (
        <span>
          <AppstoreAddOutlined />
          Components
        </span>
      ),
      children: <ComponentLib />,
    },
    {
      key: 'layers',
      label: (
        <span>
          <BarsOutlined />
          Layers
        </span>
      ),
      children: <Layers />,
    },
  ];

  return <Tabs defaultActiveKey="componentLib" items={tabsItem} />;
};

export default LeftPanel;

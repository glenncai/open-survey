import { FC } from 'react';
import { Button, Space, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@/store/hooks/useAppDispatch.ts';
import { deleteSelectedComponent } from '@/store/features/component/componentsSlice.ts';

const EditToolbar: FC = () => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteSelectedComponent());
  };

  return (
    <Space>
      <Tooltip title="Delete">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete} />
      </Tooltip>
    </Space>
  );
};

export default EditToolbar;

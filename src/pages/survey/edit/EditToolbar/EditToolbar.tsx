import { FC } from 'react';
import { Button, Space, Tooltip } from 'antd';
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
} from '@ant-design/icons';
import { useAppDispatch } from '@/store/hooks/useAppDispatch.ts';
import {
  deleteSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
} from '@/store/features/component/componentsSlice.ts';
import useGetComponentInfo from '@/hooks/useGetComponentInfo.ts';

const EditToolbar: FC = () => {
  const dispatch = useAppDispatch();
  const { selectedId, selectedComponent, copiedComponent } = useGetComponentInfo();
  const { isLocked } = selectedComponent || {};

  // Delete the selected component
  const handleDelete = () => {
    dispatch(deleteSelectedComponent());
  };

  // Hide the selected component
  const handleHide = () => {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }));
  };

  // Lock the selected component
  const handleLock = () => {
    dispatch(toggleComponentLocked({ fe_id: selectedId }));
  };

  // Copy the selected component
  const handleCopy = () => {
    dispatch(copySelectedComponent());
  };

  // Paste the copied component
  const handlePaste = () => {
    dispatch(pasteCopiedComponent());
  };

  return (
    <Space>
      <Tooltip title="Delete">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete} />
      </Tooltip>
      <Tooltip title="Hide">
        <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHide} />
      </Tooltip>
      <Tooltip title="Lock">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          type={isLocked ? 'primary' : 'default'}
          onClick={handleLock}
        />
      </Tooltip>
      <Tooltip title="Copy">
        <Button shape="circle" icon={<CopyOutlined />} onClick={handleCopy} />
      </Tooltip>
      <Tooltip title="Paste">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          disabled={copiedComponent === null}
          onClick={handlePaste}
        />
      </Tooltip>
    </Space>
  );
};

export default EditToolbar;

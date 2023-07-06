import { FC, Key, useState } from 'react';
import styles from './common.module.scss';
import { Typography, Empty, Table, Tag, Button, Space, Modal } from 'antd';
import {
  CheckCircleOutlined,
  MinusCircleOutlined,
  QuestionCircleOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';
import ListSearch from '@/components/ListSearch/ListSearch.tsx';
import ListPagination from '@/components/ListPagination/ListPagination.tsx';
import Loading from '@/components/Loading/Loading.tsx';
import useLoadSurveyListData from '@/hooks/useLoadSurveyListData.ts';

const { Title } = Typography;

const Trash: FC = () => {
  const { data = {}, loading } = useLoadSurveyListData({ isDeleted: true });
  const { list: surveyList = [], total = 0 } = data;
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [modal, contextHolder] = Modal.useModal();
  const tableColumns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Published',
      dataIndex: 'isPublished',
      key: 'isPublished',
      render: (isPublished: boolean) =>
        isPublished ? (
          <Tag icon={<CheckCircleOutlined />} color="green">
            Published
          </Tag>
        ) : (
          <Tag icon={<MinusCircleOutlined />}>Unpublished</Tag>
        ),
    },
    {
      title: 'Star',
      dataIndex: 'isStar',
      key: 'isStar',
      render: (isStar: boolean) =>
        isStar ? (
          <StarFilled className={styles.starColor} />
        ) : (
          <StarOutlined className={styles.starColor} />
        ),
    },
    {
      title: 'Answered',
      dataIndex: 'answeredCount',
      key: 'answeredCount',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ];

  function handleDelete() {
    modal.confirm({
      title: 'Delete survey',
      content: 'Are you sure to delete the selected survey permanently?',
      okText: 'Confirm',
      cancelText: 'Cancel',
      icon: <QuestionCircleOutlined style={{ color: 'red' }} />,
    });
  }

  const TableElement = (
    <>
      <div className={styles.buttonContainer}>
        {contextHolder}
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0}>
            Restore
          </Button>
          <Button disabled={selectedIds.length === 0} onClick={handleDelete}>
            Delete
          </Button>
        </Space>
      </div>
      <Table
        dataSource={surveyList}
        columns={tableColumns}
        pagination={false}
        rowKey={survey => survey._id}
        loading={loading}
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys: Key[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`);
            setSelectedIds(selectedRowKeys as string[]);
          },
        }}
      />
    </>
  );

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>Recycle Bin</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && <Loading />}
        {!loading && surveyList.length === 0 && <Empty description="No survey" />}
        {!loading && surveyList.length > 0 && TableElement}
      </div>
      <div className={styles.footer}>
        <ListPagination total={total} />
      </div>
    </>
  );
};

export default Trash;

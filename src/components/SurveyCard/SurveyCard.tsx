import { FC } from 'react';
import styles from './SurveyCard.module.scss';
import { useNavigate, Link } from 'react-router-dom';
import { SURVEY_EDIT_PATHNAME, SURVEY_STAT_PATHNAME } from '@/constants/index.tsx';
import { Button, Space, Divider, Tag, Popconfirm, message } from 'antd';
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  StarFilled,
  CopyOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  MinusCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

type SurveyCardType = {
  _id: string;
  title: string;
  isPublished: boolean;
  isStarred: boolean;
  answeredCount: number;
  createdAt: string;
};

const SurveyCard: FC<SurveyCardType> = props => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { _id, title, isPublished, isStarred, answeredCount, createdAt } = props;

  function handleDuplicate() {
    messageApi.success('Create survey successfully').then(() => {
      console.log('Duplicate confirmed');
    });
  }

  function handleDelete() {
    messageApi.success('Deleted survey successfully').then(() => {
      console.log('Delete confirmed');
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link
            to={
              isPublished
                ? SURVEY_STAT_PATHNAME.replace(':id', _id)
                : SURVEY_EDIT_PATHNAME.replace(':id', _id)
            }
          >
            {title}
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? (
              <Tag icon={<CheckCircleOutlined />} color="green">
                Published
              </Tag>
            ) : (
              <Tag icon={<MinusCircleOutlined />}>Unpublished</Tag>
            )}
            <span>Answer: {answeredCount}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider className={styles.dividerMargin} />
      <div className={styles.buttonContainer}>
        <div className={styles.left}>
          <Space>
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => navigate(SURVEY_EDIT_PATHNAME.replace(':id', _id))}
            >
              Edit
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              disabled={!isPublished}
              onClick={() => navigate(SURVEY_STAT_PATHNAME.replace(':id', _id))}
            >
              Statistics
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          {contextHolder}
          <Space>
            <Button
              icon={
                isStarred ? (
                  <StarFilled className={styles.starColor} />
                ) : (
                  <StarOutlined className={styles.starColor} />
                )
              }
              type="text"
              size="small"
            >
              {isStarred ? 'Unstar' : 'Star'}
            </Button>
            <Popconfirm
              title="Duplicate the survey"
              description="Are you sure to duplicate this survey?"
              cancelText="Cancel"
              okText="Confirm"
              onConfirm={handleDuplicate}
            >
              <Button icon={<CopyOutlined />} type="text" size="small">
                Duplicate
              </Button>
            </Popconfirm>
            <Popconfirm
              title="Delete the survey"
              description="Are you sure to delete this survey?"
              cancelText="Cancel"
              okText="Confirm"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              onConfirm={handleDelete}
            >
              <Button icon={<DeleteOutlined />} type="text" size="small">
                Delete
              </Button>
            </Popconfirm>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default SurveyCard;

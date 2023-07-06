import { FC } from 'react';
import styles from './home.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from 'antd';
import { MANAGE_LIST_PATHNAME } from '@/constants/index.tsx';
import { TypeAnimation } from 'react-type-animation';

const { Title } = Typography;

const Home: FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>Open Survey | Online Poll</Title>
        <TypeAnimation
          sequence={[
            'We have created over 100,000 surveys, released more than 90,000 surveys, and received over 500,000 answers.',
            1000,
            'Open source, free, and easy to use.',
            1000,
          ]}
          wrapper="p"
          cursor={true}
          repeat={Infinity}
          speed={65}
          style={{ fontSize: '18px', display: 'inline-block' }}
        ></TypeAnimation>
        <div>
          <Button type="primary" size="large" onClick={() => navigate(MANAGE_LIST_PATHNAME)}>
            Start for Free
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;

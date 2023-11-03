import styles from './ComponentLib.module.scss';
import { FC } from 'react';
import { Typography } from 'antd';
import { useAppDispatch } from '@/store/hooks/useAppDispatch.ts';
import { componentConfGroup, ComponentConfType } from '@/components/SurveyComponents';
import { addComponent } from '@/store/features/component/componentsSlice.ts';
import { nanoid } from 'nanoid';

const { Title } = Typography;

const GetComponent = (component: ComponentConfType) => {
  const dispatch = useAppDispatch();
  const { title, type, Component, defaultProps } = component;

  const handleAddComponent = () => {
    dispatch(
      addComponent({
        fe_id: nanoid(),
        title,
        type,
        props: defaultProps,
      })
    );
  };

  return (
    <div key={type} className={styles.wrapper} onClick={handleAddComponent}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  );
};

const ComponentLib: FC = () => {
  return (
    <>
      {componentConfGroup.map(group => {
        const { groupId, groupName, components } = group;

        return (
          <div key={groupId} className={styles.titleContainer}>
            <Title level={3} className={styles.title}>
              {groupName}
            </Title>
            <div>{components.map(component => GetComponent(component))}</div>
          </div>
        );
      })}
    </>
  );
};

export default ComponentLib;

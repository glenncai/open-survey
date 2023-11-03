import styles from './ComponentProp.module.scss';
import { FC } from 'react';
import { useAppDispatch } from '@/store/hooks/useAppDispatch.ts';
import useGetComponentInfo from '@/hooks/useGetComponentInfo.ts';
import { changeComponentProps } from '@/store/features/component/componentsSlice.ts';
import { ComponentPropsType, getComponentConfByType } from '@/components/SurveyComponents';

const NoProp: FC = () => {
  return <div className={styles.noPropComponent}>No components selected</div>;
};

const ComponentProp: FC = () => {
  const dispatch = useAppDispatch();
  const { selectedComponent } = useGetComponentInfo();

  const handleChangeProps = (newProps: ComponentPropsType) => {
    if (!selectedComponent) return;
    const { fe_id } = selectedComponent;
    dispatch(changeComponentProps({ fe_id, newProps }));
  };

  if (!selectedComponent) return <NoProp />;

  const { type, props } = selectedComponent;

  const componentConf = getComponentConfByType(type);

  if (!componentConf) return <NoProp />;

  const { PropComponent } = componentConf;

  return <PropComponent {...props} onChange={handleChangeProps} />;
};

export default ComponentProp;

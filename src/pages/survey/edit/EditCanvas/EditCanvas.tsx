import styles from './EditCanvas.module.scss';
import { FC, MouseEvent } from 'react';
import classNames from 'classnames';
import { getComponentConfByType } from '@/components/SurveyComponents';
import { changeSelectedId, ComponentInfoType } from '@/store/features/component/componentsSlice.ts';
import Loading from '@/components/Loading/Loading.tsx';
import useGetComponentInfo from '@/hooks/useGetComponentInfo.ts';
import { useAppDispatch } from '@/store/hooks/useAppDispatch.ts';

type EditCanvasType = {
  loading: boolean;
};

const EditCanvas: FC<EditCanvasType> = (props: EditCanvasType) => {
  const dispatch = useAppDispatch();
  const { loading } = props;
  const { componentList, selectedId } = useGetComponentInfo();

  const getComponent = (componentInfo: ComponentInfoType) => {
    const { type, props } = componentInfo;

    const componentConf = getComponentConfByType(type);
    if (componentConf == null) return null;

    const { Component } = componentConf;
    return <Component {...props} />;
  };

  const handleClick = (event: MouseEvent, id: string) => {
    event.stopPropagation();
    dispatch(changeSelectedId(id));
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.canvasContainer}>
          {componentList
            .filter(component => !component.isHidden)
            .map(component => {
              const { fe_id, isLocked } = component;

              const wrapperDefaultClassName = styles.componentWrapper;
              const selectedClassName = styles.selected;
              const lockedClassName = styles.locked;
              const wrapperClassName = classNames({
                [wrapperDefaultClassName]: true,
                [selectedClassName]: fe_id === selectedId,
                [lockedClassName]: isLocked,
              });

              return (
                <div
                  key={fe_id}
                  className={wrapperClassName}
                  onClick={event => handleClick(event, fe_id)}
                >
                  <div className={styles.componentPrevent}>{getComponent(component)}</div>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default EditCanvas;

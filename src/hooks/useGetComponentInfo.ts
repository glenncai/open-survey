import { useAppSelector } from '@/store/hooks/useAppSelector.ts';

export const useGetComponentInfo = () => {
  const components = useAppSelector(state => state.components);

  const { componentList = [], selectedId } = components;

  const selectedComponent = componentList.find(c => c.fe_id === selectedId);

  return {
    componentList,
    selectedId,
    selectedComponent,
  };
};

export default useGetComponentInfo;

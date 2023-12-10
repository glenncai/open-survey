import { useAppSelector } from '@/store/hooks/useAppSelector.ts';

const useGetComponentInfo = () => {
  const components = useAppSelector(state => state.components);

  const { componentList = [], selectedId, copiedComponent = null } = components;

  const selectedComponent = componentList.find(c => c.fe_id === selectedId);

  return {
    componentList,
    selectedId,
    selectedComponent,
    copiedComponent,
  };
};

export default useGetComponentInfo;

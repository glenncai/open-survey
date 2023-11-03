import {
  ComponentInfoType,
  ComponentStateType,
} from '@/store/features/component/componentsSlice.ts';

export const insertNewComponent = (state: ComponentStateType, newComponent: ComponentInfoType) => {
  const { selectedId, componentList } = state;
  const index = componentList.findIndex(c => c.fe_id === selectedId);

  if (index < 0) {
    // No components are selected in the canvas
    state.componentList.push(newComponent);
  } else {
    // A component is selected in the canvas, insert after the selected component
    state.componentList.splice(index + 1, 0, newComponent);
  }

  state.selectedId = newComponent.fe_id;
};

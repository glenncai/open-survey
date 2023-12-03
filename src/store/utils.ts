import {
  ComponentInfoType,
  ComponentStateType,
} from '@/store/features/component/componentsSlice.ts';

/**
 * Insert a new component
 *
 * @param state draft state
 * @param newComponent new component
 */
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

/**
 * Recalculate the selectedId
 *
 * @param fe_id current id
 * @param componentList component list
 * @returns the next selectedId
 */
export const calculateNextSelectedId = (fe_id: string, componentList: ComponentInfoType[]) => {
  const visibleComponentList = componentList.filter(c => !c.isHidden);
  const index = visibleComponentList.findIndex(c => c.fe_id === fe_id);
  if (index < 0) return '';

  // Recalculate the selectedId
  let newSelectedId = '';
  const length = visibleComponentList.length;
  if (length <= 1) {
    // If there is only one component, then there is no component after it
    newSelectedId = '';
  } else {
    // If there are more than one component
    if (index + 1 === length) {
      // If the last component is deleted, select the previous one
      newSelectedId = visibleComponentList[index - 1].fe_id;
    } else {
      // If the last component is not deleted, select the next one
      newSelectedId = visibleComponentList[index + 1].fe_id;
    }
  }

  return newSelectedId;
};

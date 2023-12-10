import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ComponentPropsType } from '@/components/SurveyComponents';
import { calculateNextSelectedId, insertNewComponent } from '@/store/utils.ts';
import cloneDeep from 'lodash.clonedeep';
import { nanoid } from 'nanoid';

export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  isHidden: boolean;
  isLocked: boolean;
  props: ComponentPropsType;
};

export type ComponentStateType = {
  selectedId: string;
  componentList: ComponentInfoType[];
  copiedComponent: ComponentInfoType | null;
};

const initialState: ComponentStateType = {
  selectedId: '',
  componentList: [],
  copiedComponent: null,
};

export const componentsSlice = createSlice({
  name: 'components',
  initialState,
  reducers: {
    resetComponents(state, action: PayloadAction<ComponentStateType>) {
      state.componentList = action.payload.componentList;
      state.selectedId = action.payload.selectedId;
    },
    changeSelectedId(state, action: PayloadAction<string>) {
      state.selectedId = action.payload;
    },
    addComponent(state, action: PayloadAction<ComponentInfoType>) {
      const newComponent = action.payload;
      insertNewComponent(state, newComponent);
    },
    changeComponentProps(
      state,
      action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
    ) {
      const { fe_id, newProps } = action.payload;

      // The component to be changed
      const currentComponent = state.componentList.find(component => component.fe_id === fe_id);
      if (currentComponent) {
        currentComponent.props = {
          ...currentComponent.props,
          ...newProps,
        };
      }
    },
    deleteSelectedComponent(state) {
      const { selectedId: deletedId, componentList } = state;

      // Recalculate the selectedId
      state.selectedId = calculateNextSelectedId(deletedId, componentList);

      const index = componentList.findIndex(component => component.fe_id === deletedId);
      if (index > -1) {
        componentList.splice(index, 1);
      }
    },
    changeComponentHidden(state, action: PayloadAction<{ fe_id: string; isHidden: boolean }>) {
      const { componentList = [] } = state;
      const { fe_id, isHidden } = action.payload;

      // Recalculate the selectedId
      let newSelectedId = '';
      if (isHidden) {
        newSelectedId = calculateNextSelectedId(fe_id, componentList);
      } else {
        newSelectedId = fe_id;
      }
      state.selectedId = newSelectedId;

      // The component to be changed
      const currentComponent = componentList.find(component => component.fe_id === fe_id);
      if (currentComponent) {
        currentComponent.isHidden = isHidden;
      }
    },
    toggleComponentLocked(state, action: PayloadAction<{ fe_id: string }>) {
      const { fe_id } = action.payload;

      // The component to be changed
      const currentComponent = state.componentList.find(component => component.fe_id === fe_id);
      if (currentComponent) {
        currentComponent.isLocked = !currentComponent.isLocked;
      }
    },
    copySelectedComponent(state) {
      const { selectedId, componentList = [] } = state;
      const selectedComponent = componentList.find(component => component.fe_id === selectedId);
      if (selectedComponent) {
        state.copiedComponent = cloneDeep(selectedComponent);
      }
    },
    pasteCopiedComponent(state) {
      const { copiedComponent } = state;
      if (copiedComponent) {
        const newComponent = {
          ...copiedComponent,
          fe_id: nanoid(),
        };
        insertNewComponent(state, newComponent);
      }
    },
    selectPrevComponent(state) {
      const { selectedId, componentList } = state;
      const index = componentList.findIndex(component => component.fe_id === selectedId);
      if (index > 0) {
        state.selectedId = componentList[index - 1].fe_id;
      }
    },
    selectNextComponent(state) {
      const { selectedId, componentList } = state;
      const index = componentList.findIndex(component => component.fe_id === selectedId);
      if (index < componentList.length - 1) {
        state.selectedId = componentList[index + 1].fe_id;
      }
    },
  },
});

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  deleteSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
} = componentsSlice.actions;

export default componentsSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ComponentPropsType } from '@/components/SurveyComponents';
import { calculateNextSelectedId, insertNewComponent } from '@/store/utils.ts';

export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  isHidden?: boolean;
  isLocked?: boolean;
  props: ComponentPropsType;
};

export type ComponentStateType = {
  selectedId: string;
  componentList: ComponentInfoType[];
};

const initialState: ComponentStateType = {
  selectedId: '',
  componentList: [],
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
  },
});

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  deleteSelectedComponent,
} = componentsSlice.actions;

export default componentsSlice.reducer;

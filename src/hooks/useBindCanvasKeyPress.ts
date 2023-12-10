import { useKeyPress } from 'ahooks';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import {
  deleteSelectedComponent,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
} from '@/store/features/component/componentsSlice';

/**
 * Check if the element is in the canvas, if not, it is not a valid element
 */
const isActiveElementValid = () => {
  const activeElement = document.activeElement;
  return !(activeElement && activeElement.tagName === 'INPUT');
};

const useBindCanvasKeyPress = () => {
  const dispatch = useAppDispatch();

  // Delete selected component
  useKeyPress(['backspace', 'delete'], () => {
    if (isActiveElementValid()) {
      dispatch(deleteSelectedComponent());
    }
  });

  // Copy selected component
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (isActiveElementValid()) {
      dispatch(copySelectedComponent());
    }
  });

  // Paste selected component
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (isActiveElementValid()) {
      dispatch(pasteCopiedComponent());
    }
  });

  // Select previous component
  useKeyPress(['uparrow'], () => {
    if (isActiveElementValid()) {
      dispatch(selectPrevComponent());
    }
  });

  // Select next component
  useKeyPress(['downarrow'], () => {
    if (isActiveElementValid()) {
      dispatch(selectNextComponent());
    }
  });
};

export default useBindCanvasKeyPress;

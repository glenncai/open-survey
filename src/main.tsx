import '@/lib/wdyr.ts';
import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@/store/store.ts';
import App from './App.tsx';
import './index.css';
import { DevSupport } from '@react-buddy/ide-toolbox';
import { ComponentPreviews, useInitial } from './dev';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
        <App />
      </DevSupport>
    </Provider>
  </React.StrictMode>
);

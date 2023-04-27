import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
import {rootReducer} from '@/app/rootReducer';
import {googleNewsApi} from '@/app/services/googleNews/api';
import {Section} from '@/pages';
import {Header} from '@/widgets';

import './App.scss';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(googleNewsApi.middleware),
});

setupListeners(store.dispatch);

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="app">
          <Header />
          <Section />
        </div>
      </BrowserRouter>
    </Provider>
  );
};

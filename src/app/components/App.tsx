import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {store} from '@/app/store';
import {MainPage} from '@/pages';
import {Header} from '@/widgets';

import './App.scss';

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="app">
          <Header />
          <MainPage />
        </div>
      </BrowserRouter>
    </Provider>
  );
};

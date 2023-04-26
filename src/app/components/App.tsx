import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Section} from '@/pages';
import {Header} from '@/widgets';

import './App.scss';

export const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Section />
      </div>
    </BrowserRouter>
  );
};

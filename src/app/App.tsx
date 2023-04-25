import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Section} from '../components/Section/Section';

import './App.scss';

export const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Section />
      </div>
    </BrowserRouter>
  );
};

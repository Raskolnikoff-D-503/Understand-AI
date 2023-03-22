import React from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {Section} from './Section/Section';

import './App.scss';

export const App = () => {
  return (
    <div className="app">
      <DndProvider backend={HTML5Backend}>
        <Section />
      </DndProvider>
    </div>
  );
};

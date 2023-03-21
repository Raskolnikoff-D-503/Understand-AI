import React from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {Section} from './Section';

export const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Section />
    </DndProvider>
  );
};

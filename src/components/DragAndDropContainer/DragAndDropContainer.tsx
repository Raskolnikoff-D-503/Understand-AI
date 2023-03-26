import React from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {DragAndDropContainerLayout} from './DragAndDropContainerLayout';

type Props<T extends {id: string}> = {
  data: T[];
  children: JSX.Element[];
  updateDataHandler: (data: T[]) => void;
  className: string;
};

export const DragAndDropContainer = <T extends {id: string}>({
  data,
  children,
  updateDataHandler,
  className,
}: Props<T>) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <DragAndDropContainerLayout
        data={data}
        updateDataHandler={updateDataHandler}
        className={className}
      >
        {children}
      </DragAndDropContainerLayout>
    </DndProvider>
  );
};

import React from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {DragAndDropContainerLayout} from './DragAndDropContainerLayout';

type Props = {
  id: string;
  className: string;
};

type DragAndDropContainerProps<T> = {
  data: T[];
  updateDataHandler: (data: T[]) => void;
  className: string;
};

export const DragAndDropContainer = <
  T extends {
    id: string;
    className: string;
    Component: ({id, className}: Props) => JSX.Element;
  },
>({
  data,
  updateDataHandler,
  className,
}: DragAndDropContainerProps<T>) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <DragAndDropContainerLayout
        data={data}
        updateDataHandler={updateDataHandler}
        className={className}
      />
    </DndProvider>
  );
};

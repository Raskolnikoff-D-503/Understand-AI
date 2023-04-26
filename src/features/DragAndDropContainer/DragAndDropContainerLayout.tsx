import React, {useCallback} from 'react';
import {useDrop} from 'react-dnd';
import {CustomDragLayer} from './CustomDragLayer/CustomDragLayer';
import {DraggableElement} from './DraggableElement/DraggableElement';

type Props = {
  id: string;
  className: string;
};

type DragAndDropContainerLayoutProps<T> = {
  data: T[];
  updateDataHandler: (data: T[]) => void;
  className: string;
};

export const DragAndDropContainerLayout = <
  T extends {
    id: string;
    className: string;
    Component: ({id, className}: Props) => JSX.Element;
  },
>({
  data,
  updateDataHandler,
  className,
}: DragAndDropContainerLayoutProps<T>) => {
  const [, dropRef] = useDrop(() => ({accept: 'card'}));

  const findElement = useCallback(
    (id: string) => {
      const card = data.filter((c) => c.id === id)[0];

      return {
        card,
        index: data.indexOf(card),
      };
    },
    [data],
  );

  const moveElement = useCallback(
    (id: string, atIndex: number) => {
      const updatedElementsOrder = [...data];
      const {card, index} = findElement(id);

      updatedElementsOrder.splice(index, 1);
      updatedElementsOrder.splice(atIndex, 0, card);

      updateDataHandler(updatedElementsOrder);
    },
    [data, findElement, updateDataHandler],
  );

  return (
    <div className={className} ref={dropRef}>
      {data.map((item) => {
        const {id, className, Component} = item;

        return (
          <DraggableElement
            key={id}
            id={id}
            className={className}
            moveElement={moveElement}
            findElement={findElement}
          >
            <Component id={id} className={className} />
          </DraggableElement>
        );
      })}
      <CustomDragLayer />
    </div>
  );
};

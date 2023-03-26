import React, {Children, useCallback} from 'react';
import {useDrop} from 'react-dnd';
import {CustomDragLayer} from './CustomDragLayer/CustomDragLayer';
import {DraggableElement} from './DraggableElement/DraggableElement';

type Props<T extends {id: string}> = {
  data: T[];
  children: JSX.Element[];
  updateDataHandler: (data: T[]) => void;
  className: string;
};

export const DragAndDropContainerLayout = <T extends {id: string}>({
  data,
  children,
  updateDataHandler,
  className,
}: Props<T>) => {
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
      {Children.map(children, (child) => (
        <DraggableElement
          key={child.props.id}
          id={child.props.id}
          moveElement={moveElement}
          findElement={findElement}
        >
          {child}
        </DraggableElement>
      ))}
      <CustomDragLayer />
    </div>
  );
};

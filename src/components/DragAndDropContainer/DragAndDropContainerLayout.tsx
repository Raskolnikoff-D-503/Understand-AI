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
      const updateCards = [...data];
      const {card, index} = findElement(id);

      updateCards.splice(index, 1);
      updateCards.splice(atIndex, 0, card);

      updateDataHandler(updateCards);
    },
    [data, findElement, updateDataHandler],
  );

  return (
    <div className={className} ref={dropRef}>
      {Children.map(children, (child) => (
        <DraggableElement
          key={child.props.id}
          id={child.props.id}
          moveCard={moveElement}
          findCard={findElement}
        >
          {child}
        </DraggableElement>
      ))}
      <CustomDragLayer />
    </div>
  );
};

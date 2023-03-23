import React, {ReactNode, useEffect} from 'react';
import {useDrag, useDrop} from 'react-dnd';
import {getEmptyImage} from 'react-dnd-html5-backend';

type Props = {
  id: number;
  moveCard: (id: number, to: number) => void;
  findCard: (id: number) => {index: number};
  children: ReactNode;
};

export const DraggableElement = ({id, moveCard, findCard, children}: Props) => {
  const originalIndex = findCard(id).index;
  const [{opacity}, dragRef, preview] = useDrag(
    () => ({
      type: 'card',
      item: children,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0 : 1,
      }),
      end: (_, monitor) => {
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveCard(id, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveCard],
  );

  const [, dropRef] = useDrop(
    () => ({
      accept: 'card',
      hover() {
        if (id !== id) {
          const {index: overIndex} = findCard(id);
          moveCard(id, overIndex);
        }
      },
    }),
    [findCard, moveCard],
  );

  useEffect(() => {
    preview(getEmptyImage(), {captureDraggingState: true});
  }, []);

  return (
    <div
      ref={(node) => dragRef(dropRef(node))}
      className="draggable-element"
      style={{opacity, cursor: 'grab'}}
    >
      {children}
    </div>
  );
};

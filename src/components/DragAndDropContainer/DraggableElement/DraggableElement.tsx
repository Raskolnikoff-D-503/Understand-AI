import React, {useEffect} from 'react';
import {useDrag, useDrop} from 'react-dnd';
import {getEmptyImage} from 'react-dnd-html5-backend';

type Props = {
  id: string;
  moveCard: (id: string, to: number) => void;
  findCard: (id: string) => {index: number};
  children: JSX.Element;
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
      end: (data: JSX.Element, monitor) => {
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveCard(data?.props?.id, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveCard],
  );

  const [, dropRef] = useDrop(
    () => ({
      accept: 'card',
      hover(data: JSX.Element) {
        if (data?.props?.id !== id) {
          const {index: overIndex} = findCard(id);
          moveCard(data.props.id, overIndex);
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

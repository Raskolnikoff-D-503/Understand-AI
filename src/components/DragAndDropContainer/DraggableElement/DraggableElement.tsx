import React, {useEffect} from 'react';
import {useDrag, useDrop} from 'react-dnd';
import {getEmptyImage} from 'react-dnd-html5-backend';

type Props = {
  id: string;
  moveElement: (id: string, to: number) => void;
  findElement: (id: string) => {index: number};
  children: JSX.Element;
};

export const DraggableElement = ({id, moveElement, findElement, children}: Props) => {
  const originalIndex = findElement(id).index;
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
          moveElement(data?.props?.id, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveElement],
  );

  const [, dropRef] = useDrop(
    () => ({
      accept: 'card',
      hover(data: JSX.Element) {
        if (data?.props?.id !== id) {
          const {index: overIndex} = findElement(id);
          moveElement(data.props.id, overIndex);
        }
      },
    }),
    [findElement, moveElement],
  );

  useEffect(() => {
    preview(getEmptyImage(), {captureDraggingState: true});
  }, []);

  return (
    <div
      ref={(node) => dragRef(dropRef(node))}
      className={`draggable-element ${children.props.className}`}
      style={{opacity, cursor: 'grab'}}
    >
      {children}
    </div>
  );
};

import React, {ReactNode, useEffect} from 'react';
import {DragSourceMonitor, useDrag} from 'react-dnd';
import {getEmptyImage} from 'react-dnd-html5-backend';

type Props = {
  children: ReactNode;
};

export const DraggableElement = ({children}: Props) => {
  const [{opacity}, dragRef, preview] = useDrag(
    () => ({
      type: 'card',
      item: children,
      collect: (monitor: DragSourceMonitor) => ({
        opacity: monitor.isDragging() ? 0 : 1,
      }),
    }),
    [],
  );

  useEffect(() => {
    preview(getEmptyImage(), {captureDraggingState: true});
  }, []);

  return (
    <div ref={dragRef} className="draggable-element" style={{opacity, cursor: 'grab'}}>
      {children}
    </div>
  );
};

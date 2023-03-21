import React from 'react';
import {useDrag} from 'react-dnd';

export const Section = () => {
  const [{opacity}, dragRef] = useDrag(
    () => ({
      type: 'card',
      item: {text: 'TEST'},
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    [],
  );

  return (
    <section>
      <div ref={dragRef} style={{opacity}}>
        <p>TEXT</p>
      </div>
    </section>
  );
};

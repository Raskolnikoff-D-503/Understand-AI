import React from 'react';
import {CustomDragLayer} from '../CustomDragLayer/CustomDragLayer';
import {DraggableElement} from '../DraggableElement/DraggableElement';

import './Section.scss';

export const Section = () => {
  return (
    <section className="section">
      <DraggableElement>
        <div className="element">TEXT</div>
      </DraggableElement>
      <DraggableElement>
        <div className="element">ANOTHER TEXT</div>
      </DraggableElement>
      <CustomDragLayer />
    </section>
  );
};

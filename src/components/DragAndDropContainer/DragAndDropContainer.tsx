import React from 'react';
import {CustomDragLayer} from '../CustomDragLayer/CustomDragLayer';

type Props = {
  className: string;
  children: JSX.Element[];
};

export const DragAndDropContainer = ({className, children}: Props) => {
  return (
    <div className={className}>
      {children}
      <CustomDragLayer />
    </div>
  );
};

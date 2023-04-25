import React, {ReactNode} from 'react';
import {Title} from '@/shared/UI';
import {DraggableIcon} from '@/shared/icons';
import {SIZE} from '@/shared/constants';

import './Card.scss';

type Props = {
  id?: string;
  className?: string;
  title?: string;
  isDraggable?: boolean;
  children: ReactNode;
};

export const Card = ({id, className, title, isDraggable = false, children}: Props) => {
  return (
    <div id={id} className={`card ${className}`}>
      {(title || isDraggable) && (
        <div className="card__title-container">
          {title && <Title size={SIZE.MEDIUM}>{title}</Title>}
          {isDraggable && (
            <div className="card__icon-wrapper">
              <DraggableIcon />
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

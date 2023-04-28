import React, {ReactNode} from 'react';
import {CardContentLoader, Title, TitleLoader} from '@/shared/UI';
import {DraggableIcon} from '@/shared/icons';
import {SIZE} from '@/shared/constants';

import './Card.scss';

type Props = {
  id?: string;
  className?: string;
  title?: string;
  isDraggable?: boolean;
  isLoading?: boolean;
  children: ReactNode;
};

export const Card = ({
  id,
  className,
  title,
  isDraggable = false,
  isLoading = false,
  children,
}: Props) => {
  return (
    <div id={id} className={`card ${className}`}>
      {(title || isDraggable || isLoading) && (
        <div className="card__title-container">
          {isLoading && <TitleLoader />}
          {!isLoading && title && <Title size={SIZE.MEDIUM}>{title}</Title>}
          {!isLoading && isDraggable && (
            <div className="card__icon-wrapper">
              <DraggableIcon />
            </div>
          )}
        </div>
      )}
      <div className="card__content">{isLoading ? <CardContentLoader /> : children}</div>
    </div>
  );
};

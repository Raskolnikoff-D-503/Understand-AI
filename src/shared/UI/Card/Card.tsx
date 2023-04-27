import React, {ReactNode} from 'react';
import {ShimmerTitle, ShimmerSectionHeader} from 'react-shimmer-effects';
import {Title} from '@/shared/UI';
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
          {isLoading && (
            <div className="card__shimmer-title-wrapper">
              <ShimmerTitle line={2} gap={10} variant="primary" />
            </div>
          )}
          {!isLoading && title && <Title size={SIZE.MEDIUM}>{title}</Title>}
          {!isLoading && isDraggable && (
            <div className="card__icon-wrapper">
              <DraggableIcon />
            </div>
          )}
        </div>
      )}
      <div className="card__content">
        {isLoading ? (
          <>
            <ShimmerSectionHeader />
            <ShimmerSectionHeader />
            <ShimmerSectionHeader />
          </>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

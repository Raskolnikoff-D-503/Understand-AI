import React, {ReactNode} from 'react';
import {FetchBaseQueryError} from '@reduxjs/toolkit/dist/query';
import {SerializedError} from '@reduxjs/toolkit';
import {CardContentLoader, Error, Title, TitleLoader} from '@/shared/UI';
import {DraggableIcon} from '@/shared/icons';
import {SIZE} from '@/shared/constants';

import './Card.scss';

type Props = {
  id?: string;
  className?: string;
  title?: string;
  isDraggable?: boolean;
  isLoading?: boolean;
  error?: FetchBaseQueryError | SerializedError;
  children: ReactNode;
};

export const Card = ({
  id,
  className,
  title,
  isDraggable = false,
  isLoading = false,
  error,
  children,
}: Props) => {
  return (
    <div id={id} className={`card ${className}`}>
      {!error && (title || isDraggable || isLoading) && (
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
      <div className="card__content">
        {isLoading ? <CardContentLoader /> : error ? <Error error={error} /> : children}
      </div>
    </div>
  );
};

import React, {ReactNode} from 'react';
import {FetchBaseQueryError} from '@reduxjs/toolkit/dist/query';
import {SerializedError} from '@reduxjs/toolkit';
import {Error, Title, TitleLoader} from '@/shared/UI';
import {DraggableIcon} from '@/shared/icons';
import {SIZE} from '@/shared/constants';

import './Card.scss';

type LoaderConfigType = {
  isLoading: boolean;
  Component: JSX.Element;
};

type Props = {
  id?: string;
  className?: string;
  title?: string;
  isDraggable?: boolean;
  loaderConfig?: LoaderConfigType;
  error?: FetchBaseQueryError | SerializedError;
  children: ReactNode;
};

export const Card = ({
  id,
  className,
  title,
  isDraggable = false,
  loaderConfig = {isLoading: false, Component: <></>},
  error,
  children,
}: Props) => {
  const {isLoading, Component} = loaderConfig;

  return (
    <div id={id} className={`card ${className}`}>
      {(title || isDraggable || isLoading) && (
        <div className="card__title-container">
          {isLoading && <TitleLoader />}
          {!isLoading && title && <Title size={SIZE.MEDIUM}>{title}</Title>}
          {isDraggable && (
            <div className="card__icon-wrapper">
              <DraggableIcon />
            </div>
          )}
        </div>
      )}
      <div className="card__content">
        {isLoading && Component}
        {!isLoading && error && <Error error={error} />}
        {!isLoading && !error && children}
      </div>
    </div>
  );
};

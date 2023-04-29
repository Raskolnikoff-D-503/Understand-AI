import React from 'react';
import {ShimmerTitle, ShimmerText} from 'react-shimmer-effects';
import {StyleType} from '@/shared/types';
import {STYLE_TYPE} from '@/shared/constants';

import './Loaders.scss';

type TitleLoaderProps = {
  type?: StyleType;
  line?: number;
  noPadding?: boolean;
};

export const TitleLoader = ({
  type = STYLE_TYPE.PRIMARY,
  line = 2,
  noPadding = false,
}: TitleLoaderProps) => {
  return (
    <div className={`title-loader ${noPadding ? 'title-loader--no-padding' : ''}`}>
      <ShimmerTitle line={line} variant={type} />
    </div>
  );
};

type CardContentLoaderProps = {
  repeat?: number;
  line?: number;
};

export const CardContentLoader = ({repeat = 3, line = 3}: CardContentLoaderProps) => {
  return (
    <div className="card-content-loader">
      {new Array(repeat).fill(null).map((_, index) => {
        return (
          <div key={index}>
            <TitleLoader type={STYLE_TYPE.SECONDARY} line={1} noPadding />
            <ShimmerText line={line} />
          </div>
        );
      })}
    </div>
  );
};

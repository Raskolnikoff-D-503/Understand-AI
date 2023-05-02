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

type ListContentLoaderProps = {
  repeat?: number;
  line?: number;
  isTitle?: boolean;
};

export const ListContentLoader = ({
  repeat = 3,
  line = 3,
  isTitle = false,
}: ListContentLoaderProps) => {
  return (
    <div className="card-content-loader">
      {new Array(repeat).fill(null).map((_, index) => {
        return (
          <div key={index}>
            {isTitle && <TitleLoader type={STYLE_TYPE.SECONDARY} line={1} noPadding />}
            <ShimmerText line={line} />
          </div>
        );
      })}
    </div>
  );
};

type TextContentLoaderProps = {
  line?: number;
};

export const TextContentLoader = ({line = 4}: TextContentLoaderProps) => {
  return <ShimmerText line={line} />;
};

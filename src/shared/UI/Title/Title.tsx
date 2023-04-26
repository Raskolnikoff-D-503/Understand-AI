import React from 'react';
import {SizeType} from '@/shared/types';

import './Title.scss';

type Props = {
  size: SizeType;
  children: string;
  noPadding?: boolean;
};

export const Title = ({size, children, noPadding = false}: Props) => {
  return (
    <div className={`title title--${size.toLowerCase()} ${noPadding ? 'title--no-padding' : ''}`}>
      {children}
    </div>
  );
};

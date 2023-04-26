import React from 'react';
import {SizeType} from '@/shared/types';

import './Title.scss';

type Props = {
  size: SizeType;
  children: string;
};

export const Title = ({size, children}: Props) => {
  return <div className={`title title--${size.toLowerCase()}`}>{children}</div>;
};

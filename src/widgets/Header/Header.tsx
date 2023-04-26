import React from 'react';
import {Title} from '@/shared/UI';
import {SIZE} from '@/shared/constants';

import './Header.scss';

export const Header = () => {
  return (
    <div className="header">
      <div className="header__title-wrapper">
        <Title size={SIZE.LARGE}>HEADER</Title>
      </div>
      <div className="header__nav">Toggle</div>
    </div>
  );
};

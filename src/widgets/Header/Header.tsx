import React from 'react';
import {useGetIsOnEdit} from '@/app/services/mainPageController/hooks';
import {ToggleSwitch, Title} from '@/shared/UI';
import {SIZE} from '@/shared/constants';

import './Header.scss';

export const Header = () => {
  const {isOnEdit, setIsOnEdit} = useGetIsOnEdit();

  return (
    <div className="header">
      <div className="header__title-wrapper">
        <Title size={SIZE.LARGE}>Understand AI</Title>
      </div>
      <div className="header__nav">
        <ToggleSwitch isToggled={isOnEdit} onToggle={() => setIsOnEdit(!isOnEdit)} />
      </div>
    </div>
  );
};

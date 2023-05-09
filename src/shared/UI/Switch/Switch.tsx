import React from 'react';

import './Switch.scss';

type Props = {
  isToggled: boolean;
  onToggle: () => void;
};

export const Switch = ({isToggled = false, onToggle}: Props) => {
  return (
    <label className="switch">
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className="slider" />
    </label>
  );
};

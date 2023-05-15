import React from 'react';

import './ToggleSwitch.scss';

type Props = {
  isToggled: boolean;
  onToggle: () => void;
};

export const ToggleSwitch = ({isToggled = false, onToggle}: Props) => {
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className="slider" />
    </label>
  );
};

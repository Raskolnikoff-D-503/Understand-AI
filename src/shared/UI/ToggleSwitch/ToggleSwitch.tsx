import React from 'react';

import './ToggleSwitch.scss';

type Props = {
  isToggled: boolean;
  onToggle: () => void;
  disabled?: boolean;
};

export const ToggleSwitch = ({isToggled = false, onToggle, disabled = false}: Props) => {
  return (
    <label className={`toggle-switch ${disabled ? 'toggle-switch--disabled' : ''}`}>
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className="slider" />
    </label>
  );
};

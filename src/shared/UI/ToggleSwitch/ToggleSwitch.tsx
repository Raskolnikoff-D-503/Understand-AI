import React from 'react';

import './ToggleSwitch.scss';

type Props = {
  name: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

export const ToggleSwitch = ({name, checked = false, onChange}: Props) => {
  return (
    <div className="toggle-switch">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          onChange?.(e.currentTarget.checked);
        }}
        className="toggle-switch-checkbox"
        name={name}
        id={name}
      />
      <label className="toggle-switch-label" htmlFor={name}>
        <span className="toggle-switch-inner" />
        <span className="toggle-switch-switch" />
      </label>
    </div>
  );
};

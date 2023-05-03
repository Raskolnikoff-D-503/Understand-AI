import React from 'react';

import './Input.scss';

type Props = {
  value?: string;
  label?: string;
  onChange?: (value: string) => void;
};

export const Input = ({value = '', onChange, label}: Props) => {
  return (
    <div className="input">
      {label && <div className="input__label">{label}</div>}
      <input
        className="input__input"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        type="text"
      />
    </div>
  );
};

import React from 'react';

import './Input.scss';

type Props = {
  value?: string;
  onChange?: (value: string) => void;
};

export const Input = ({value = '', onChange}: Props) => {
  return (
    <input
      className="input"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      type="text"
    />
  );
};

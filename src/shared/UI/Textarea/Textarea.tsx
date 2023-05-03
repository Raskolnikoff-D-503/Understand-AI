import React from 'react';

import './Textarea.scss';

type Props = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
};

const MAX_LENGTH = 1024;

export const Textarea = ({
  value,
  onChange,
  label,
  placeholder = '',
  maxLength = MAX_LENGTH,
  rows = 2,
}: Props) => {
  return (
    <div className="textarea">
      {label && <div className="textarea__label">{label}</div>}
      <textarea
        className="textarea__input"
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        rows={rows}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </div>
  );
};

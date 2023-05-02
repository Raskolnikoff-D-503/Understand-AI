import React from 'react';

import './Textarea.scss';

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
};

const MAX_LENGTH = 1024;

export const Textarea = ({
  value,
  onChange,
  placeholder = '',
  maxLength = MAX_LENGTH,
  rows = 2,
}: Props) => {
  return (
    <textarea
      className="textarea"
      placeholder={placeholder}
      value={value}
      maxLength={maxLength}
      rows={rows}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

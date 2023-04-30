import React from 'react';

import './Textarea.scss';

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const Textarea = ({value, onChange, placeholder = ''}: Props) => {
  return (
    <textarea
      className="textarea"
      placeholder={placeholder}
      value={value}
      rows={2}
      maxLength={1024}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

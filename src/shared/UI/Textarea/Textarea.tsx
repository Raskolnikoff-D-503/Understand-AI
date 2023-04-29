import React from 'react';

import './Textarea.scss';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const Textarea = ({value, onChange}: Props) => {
  return (
    <textarea
      className="textarea"
      placeholder="Start typing..."
      value={value}
      rows={4}
      maxLength={1024}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

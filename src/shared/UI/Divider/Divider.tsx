import React from 'react';

import './Divider.scss';

type Props = {
  className?: string;
};

export const Divider = ({className = ''}: Props) => {
  return <div className={`divider ${className}`} />;
};

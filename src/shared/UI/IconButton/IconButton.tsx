import React from 'react';

import './IconButton.scss';

type Props = {
  className?: string;
  icon: JSX.Element;
  onClick: () => void;
};

export const IconButton = ({icon, onClick, className = ''}: Props) => {
  return (
    <div className={`icon-button ${className}`} onClick={onClick}>
      {icon}
    </div>
  );
};

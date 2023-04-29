import React, {ReactNode} from 'react';

import './Button.scss';

type Props = {
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
};

export const Button = ({onClick, children, disabled = false}: Props) => {
  return (
    <button onClick={onClick} className="button" disabled={disabled}>
      {children}
    </button>
  );
};

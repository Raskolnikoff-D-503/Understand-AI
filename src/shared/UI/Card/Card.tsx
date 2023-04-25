import React, {ReactNode} from 'react';
import './Card.scss';

type Props = {
  id?: string;
  className?: string;
  children: ReactNode;
};

export const Card = ({id, className, children}: Props) => {
  return (
    <div id={id} className={`card ${className}`}>
      {children}
    </div>
  );
};

import React, {ReactNode} from 'react';

import './List.scss';

type Props = {
  className?: string;
  children: ReactNode;
};

export const List = ({className = '', children}: Props) => {
  return <ul className={`list ${className}`}>{children}</ul>;
};

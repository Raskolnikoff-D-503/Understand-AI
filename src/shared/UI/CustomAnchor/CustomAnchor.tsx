import React, {ReactNode} from 'react';

import './CustomAnchor.scss';

type Props = {
  className?: string;
  href: string;
  children: ReactNode;
};

export const CustomAnchor = ({href, children, className = ''}: Props) => {
  return (
    <a
      className={`custom-anchor ${className}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

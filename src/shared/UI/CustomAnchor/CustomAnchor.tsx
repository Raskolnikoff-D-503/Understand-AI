import React, {ReactNode} from 'react';

import './CustomAnchor.scss';

type Props = {
  href: string;
  children: ReactNode;
};

export const CustomAnchor = ({href, children}: Props) => {
  return (
    <a className="custom-anchor" href={href}>
      {children}
    </a>
  );
};

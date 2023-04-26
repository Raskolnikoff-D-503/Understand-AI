import React, {ReactNode} from 'react';
import {Link} from 'react-router-dom';

import './CustomLink.scss';

type Props = {
  children: ReactNode;
  to: string;
};

export const CustomLink = ({children, to}: Props) => {
  return (
    <Link className="custom-link" to={to}>
      {children}
    </Link>
  );
};

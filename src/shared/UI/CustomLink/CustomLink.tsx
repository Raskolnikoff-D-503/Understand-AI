import React from 'react';
import {Link} from 'react-router-dom';

import './CustomLink.scss';

type Props = {
  title: string;
  to: string;
};

export const CustomLink = ({title, to}: Props) => {
  return (
    <Link className="custom-link" to={to}>
      {title}
    </Link>
  );
};

import React, {ReactNode} from 'react';

import './List.scss';

type Props = {
  children: ReactNode;
};

export const List = ({children}: Props) => {
  return <ul className="list">{children}</ul>;
};

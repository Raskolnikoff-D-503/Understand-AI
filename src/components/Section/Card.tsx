import React from 'react';

type Props = {
  id: string;
  className: string;
};

export const Card = ({id, className}: Props) => {
  return (
    <div id={id} className={className}>
      {'TEST'}
    </div>
  );
};

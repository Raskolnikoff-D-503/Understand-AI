import React from 'react';

type Props = {
  id: string;
  className: string;
  text: string;
};

export const Card = ({id, className, text}: Props) => {
  return (
    <div id={id} className={className}>
      {text}
    </div>
  );
};

import React from 'react';
import {Card, CustomLink} from '@/shared/UI';

import './CardWithListExample.scss';

type Props = {
  id: string;
  className: string;
};

const cardItems = [
  {
    id: '123',
    title: 'Check the link',
    to: '/',
  },
  {
    id: '234',
    title: 'Check the link',
    to: '/',
  },
  {
    id: '345',
    title: 'Check the link',
    to: '/',
  },
  {
    id: '456',
    title: 'Check the link',
    to: '/',
  },
  {
    id: '567',
    title: 'Check the link',
    to: '/',
  },
  {
    id: '678',
    title: 'Check the link',
    to: '/',
  },
];

export const CardWithListExample = ({id, className}: Props) => {
  return (
    <Card id={id} className={`card-with-list ${className}`} title="Interesting Facts" isDraggable>
      <ul className="card-with-list__list">
        {cardItems.map((item) => (
          <li className="card-with-list__list-item" key={item.id}>
            <CustomLink title={item.title} to={item.to} />
          </li>
        ))}
      </ul>
    </Card>
  );
};

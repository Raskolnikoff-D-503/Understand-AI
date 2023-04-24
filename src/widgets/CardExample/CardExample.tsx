import React from 'react';
import { CustomLink, Title } from '@/shared/UI';
import { SIZE } from '@/shared/constants';

import './CardExample.scss'

type Props = {
  id: string;
  className: string;
};

const cardItems = [{
  id: '123',
  title: 'Check the link',
  to: '/',
},
{
  id: '456',
  title: 'Check the link',
  to: '/',
}];

export const CardExample = ({id, className}: Props) => {
  return (
    <div id={id} className={`card ${className}`}>
      <Title size={SIZE.SMALL}>Interesting Facts</Title>
      <ul className='card__list'>{cardItems.map((item) => (<li className='card__list-item' key={item.id}>
          <CustomLink title={item.title} to={item.to} />
        </li>))}
      </ul>
    </div>
  );
};

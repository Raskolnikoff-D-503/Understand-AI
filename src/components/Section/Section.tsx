import React, {useCallback, useState} from 'react';
import {DragAndDropContainer} from '../DragAndDropContainer/DragAndDropContainer';
import {Card} from './Card';

import './Section.scss';

type Props = {
  id: string;
  className: string;
};

type ItemType = {
  id: string;
  className: string;
  Component: ({id, className}: Props) => JSX.Element;
};

const ITEMS: ItemType[] = [
  {
    id: '1',
    className: 'card',
    Component: Card,
  },
  {
    id: '2',
    className: 'card',
    Component: Card,
  },
  {
    id: '3',
    className: 'card card--full-width',
    Component: Card,
  },
  {
    id: '4',
    className: 'card',
    Component: Card,
  },
  {
    id: '5',
    className: 'card',
    Component: Card,
  },
  {
    id: '6',
    className: 'card',
    Component: Card,
  },
  {
    id: '7',
    className: 'card',
    Component: Card,
  },
];

export const Section = () => {
  const [cards, setCards] = useState(ITEMS);

  const updateDataHandler = useCallback((data: ItemType[]) => {
    setCards(data);
  }, []);

  return (
    <section className="section">
      <DragAndDropContainer
        data={cards}
        updateDataHandler={updateDataHandler}
        className="container"
      />
    </section>
  );
};

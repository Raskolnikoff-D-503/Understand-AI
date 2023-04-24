import React, {useCallback, useState} from 'react';
import {DragAndDropContainer} from '@/components/DragAndDropContainer/DragAndDropContainer';
import {CardExample} from '@/widgets/CardExample/CardExample';

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
    className: 'section__card',
    Component: CardExample,
  },
  {
    id: '2',
    className: 'section__card',
    Component: CardExample,
  },
  {
    id: '3',
    className: 'section__card section__card--full-width',
    Component: CardExample,
  },
  {
    id: '4',
    className: 'section__card',
    Component: CardExample,
  },
  {
    id: '5',
    className: 'section__card',
    Component: CardExample,
  },
  {
    id: '6',
    className: 'section__card',
    Component: CardExample,
  },
  {
    id: '7',
    className: 'section__card',
    Component: CardExample,
  },
  {
    id: '8',
    className: 'section__card',
    Component: CardExample,
  },
  {
    id: '9',
    className: 'section__card',
    Component: CardExample,
  },
  {
    id: '10',
    className: 'section__card',
    Component: CardExample,
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
        className="section__container"
      />
    </section>
  );
};

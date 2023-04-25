import React, {useCallback, useState} from 'react';
import {DragAndDropContainer} from '@/components/DragAndDropContainer/DragAndDropContainer';
import {CardWithChartExample, CardWithListExample} from '@/widgets';

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
    Component: CardWithChartExample,
  },
  {
    id: '2',
    className: 'section__card',
    Component: CardWithListExample,
  },
  {
    id: '3',
    className: 'section__card section__card--full-width',
    Component: CardWithListExample,
  },
  {
    id: '4',
    className: 'section__card',
    Component: CardWithListExample,
  },
  {
    id: '5',
    className: 'section__card',
    Component: CardWithListExample,
  },
  {
    id: '6',
    className: 'section__card',
    Component: CardWithListExample,
  },
  {
    id: '7',
    className: 'section__card',
    Component: CardWithListExample,
  },
  {
    id: '8',
    className: 'section__card',
    Component: CardWithListExample,
  },
  {
    id: '9',
    className: 'section__card',
    Component: CardWithListExample,
  },
  {
    id: '10',
    className: 'section__card',
    Component: CardWithListExample,
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

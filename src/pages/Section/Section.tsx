import React, {useCallback, useState} from 'react';
import {LearningResourcersCardWidget} from '@/widgets';
import {DragAndDropContainer} from '@/features';

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
    Component: LearningResourcersCardWidget,
  },
  {
    id: '2',
    className: 'section__card',
    Component: LearningResourcersCardWidget,
  },
  {
    id: '3',
    className: 'section__card',
    Component: LearningResourcersCardWidget,
  },
  {
    id: '4',
    className: 'section__card',
    Component: LearningResourcersCardWidget,
  },
  {
    id: '5',
    className: 'section__card',
    Component: LearningResourcersCardWidget,
  },
  // {
  //   id: '10',
  //   className: 'section__card',
  //   Component: CardWithListExample,
  // },
  // {
  //   id: '1',
  //   className: 'section__card',
  //   Component: CardWithChartExample,
  // },
  // {
  //   id: '2',
  //   className: 'section__card',
  //   Component: CardWithChartExample,
  // },
  // {
  //   id: '3',
  //   className: 'section__card section__card--full-width',
  //   Component: CardWithListExample,
  // },
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

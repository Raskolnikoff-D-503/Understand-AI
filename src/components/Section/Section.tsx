import React, {useCallback, useState} from 'react';
import {DragAndDropContainer} from '../DragAndDropContainer/DragAndDropContainer';
import {Card} from './Card';

import './Section.scss';

type ItemType = {
  id: string;
  text: string;
  isFullWidth?: boolean;
};

const ITEMS: ItemType[] = [
  {
    id: '1',
    text: 'Write a cool JS library',
  },
  {
    id: '2',
    text: 'Make it generic enough',
  },
  {
    id: '3',
    text: 'Write README',
  },
  {
    id: '4',
    text: 'Create some examples',
    isFullWidth: true,
  },
  {
    id: '5',
    text: 'Spam in Twitter and IRC to promote it',
  },
  {
    id: '6',
    text: '???',
  },
  {
    id: '7',
    text: 'PROFIT',
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
      >
        {cards.map((item) => (
          <Card
            key={item.id}
            className={`card${item.isFullWidth ? ' card--full-width' : ''}`}
            id={item.id}
            text={item.text}
          />
        ))}
      </DragAndDropContainer>
    </section>
  );
};

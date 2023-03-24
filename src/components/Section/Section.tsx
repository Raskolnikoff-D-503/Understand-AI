import React, {useCallback, useState} from 'react';
import {useDrop} from 'react-dnd';
import {CustomDragLayer} from '../CustomDragLayer/CustomDragLayer';
import {DraggableElement} from '../DraggableElement/DraggableElement';

import './Section.scss';

const ITEMS = [
  {
    id: 1,
    text: 'Write a cool JS library',
  },
  {
    id: 2,
    text: 'Make it generic enough',
  },
  {
    id: 3,
    text: 'Write README',
  },
  {
    id: 4,
    text: 'Create some examples',
  },
  {
    id: 5,
    text: 'Spam in Twitter and IRC to promote it',
  },
  {
    id: 6,
    text: '???',
  },
  {
    id: 7,
    text: 'PROFIT',
  },
];

export const Section = () => {
  const [cards, setCards] = useState(ITEMS);

  const [, dropRef] = useDrop(() => ({accept: 'card'}));

  const findCard = useCallback(
    (id: number) => {
      const card = cards.filter((c) => c.id === id)[0] as {
        id: number;
        text: string;
      };
      return {
        card,
        index: cards.indexOf(card),
      };
    },
    [cards],
  );

  const moveCard = useCallback(
    (id: string, atIndex: number) => {
      console.log(id, atIndex);

      const updateCards = [...cards];
      const {card, index} = findCard(Number(id));

      updateCards.splice(index, 1);
      updateCards.splice(atIndex, 0, card);

      setCards(updateCards);
    },
    [findCard, cards, setCards],
  );

  return (
    <section ref={dropRef} className="section">
      <div className="container">
        {cards.map((item) => (
          <DraggableElement key={item.id} id={item.id} moveCard={moveCard} findCard={findCard}>
            <div id={item.id.toString()} className="element">
              {item.text}
            </div>
          </DraggableElement>
        ))}
      </div>
      <CustomDragLayer />
    </section>
  );
};

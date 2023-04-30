import React, {useCallback, useState} from 'react';
import {useAppSelector} from '@/app/store';
import {selectIsOnEdit} from '@/app/services/mainPageController/mainPageSlice';
import {ChatGPTWidget, LearningResourcesWidget, SavedChatGPTRepliesWidget} from '@/widgets';
import {DragAndDropContainer} from '@/features';

import './MainPage.scss';

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
    id: '2',
    className: 'main-page__card',
    Component: ChatGPTWidget,
  },
  {
    id: '3',
    className: 'main-page__card',
    Component: SavedChatGPTRepliesWidget,
  },
  {
    id: '4',
    className: 'main-page__card',
    Component: LearningResourcesWidget,
  },
  {
    id: '5',
    className: 'main-page__card',
    Component: LearningResourcesWidget,
  },
  {
    id: '1',
    className: 'main-page__card main-page__card--full-width',
    Component: LearningResourcesWidget,
  },
  // {
  //   id: '10',
  //   className: 'main-page__card',
  //   Component: CardWithListExample,
  // },
  // {
  //   id: '1',
  //   className: 'main-page__card',
  //   Component: CardWithChartExample,
  // },
  // {
  //   id: '2',
  //   className: 'main-page__card',
  //   Component: CardWithChartExample,
  // },
  // {
  //   id: '3',
  //   className: 'main-page__card main-page__card--full-width',
  //   Component: CardWithListExample,
  // },
];

export const MainPage = () => {
  const [cards, setCards] = useState(ITEMS);

  const isOnEdit = useAppSelector(selectIsOnEdit);

  const updateDataHandler = useCallback((data: ItemType[]) => {
    setCards(data);
  }, []);

  return (
    <div className="main-page">
      {isOnEdit ? (
        <DragAndDropContainer
          data={cards}
          updateDataHandler={updateDataHandler}
          className="main-page__container"
        />
      ) : (
        <div className="main-page__container">
          {cards.map((item) => {
            const {id, className, Component} = item;

            return <Component id={id} key={id} className={className} />;
          })}
        </div>
      )}
    </div>
  );
};

import React, {useCallback, useState} from 'react';
import {useAppSelector} from '@/app/store';
import {selectIsOnEdit} from '@/app/services/mainPageController/mainPageSlice';
import {
  ChatGPTWidget,
  SavedChatGPTRepliesWidget,
  SavedLearningResourcesWidget,
  StudiesGraphsWidget,
  LearningResourcesWidget,
} from '@/widgets';
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
    id: 'chat-gpt-widget',
    className: 'main-page__card',
    Component: ChatGPTWidget,
  },
  {
    id: 'saved-chat-gpt-replies-widget',
    className: 'main-page__card',
    Component: SavedChatGPTRepliesWidget,
  },
  {
    id: 'saved-learning-resources-widget',
    className: 'main-page__card',
    Component: SavedLearningResourcesWidget,
  },
  {
    id: '2',
    className: 'main-page__card',
    Component: StudiesGraphsWidget,
  },
  {
    id: 'learning-resources-widget',
    className: 'main-page__card main-page__card--full-width',
    Component: LearningResourcesWidget,
  },
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

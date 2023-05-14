import React, {useCallback, useMemo} from 'react';
import {useAppSelector} from '@/app/store';
import {useLocalStorage} from '@/app/services/localStorageController/hooks';
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

const WIDGETS_STORE: {[key: string]: ({id, className}: Props) => JSX.Element} = {
  'saved-learning-resources-widget': SavedLearningResourcesWidget,
  'studies-graphs-widget': StudiesGraphsWidget,
  'chat-gpt-widget': ChatGPTWidget,
  'saved-chat-gpt-replies-widget': SavedChatGPTRepliesWidget,
  'learning-resources-widget': LearningResourcesWidget,
};

const DEFAULT_ORDER = [
  {
    id: 'saved-learning-resources-widget',
    className: 'main-page__card',
  },
  {
    id: 'studies-graphs-widget',
    className: 'main-page__card',
  },
  {
    id: 'chat-gpt-widget',
    className: 'main-page__card',
  },
  {
    id: 'saved-chat-gpt-replies-widget',
    className: 'main-page__card',
  },
  {
    id: 'learning-resources-widget',
    className: 'main-page__card main-page__card--full-width',
  },
];

export const MainPage = () => {
  const [widgets, setWidgets] = useLocalStorage<{id: string; className: string}[]>(
    'widgets',
    DEFAULT_ORDER,
  );

  const configuratedItems = useMemo<ItemType[]>(
    () => widgets.map((item) => ({...item, Component: WIDGETS_STORE[item.id]})),
    [widgets],
  );

  const isOnEdit = useAppSelector(selectIsOnEdit);

  const updateDataHandler = useCallback((data: ItemType[]) => {
    const configurated = data.map((item) => ({id: item.id, className: item.className}));
    setWidgets(configurated);
  }, []);

  return (
    <div className="main-page">
      {isOnEdit ? (
        <DragAndDropContainer
          data={configuratedItems}
          updateDataHandler={updateDataHandler}
          className="main-page__container"
        />
      ) : (
        <div className="main-page__container">
          {configuratedItems.map((item) => {
            const {id, className, Component} = item;

            return <Component id={id} key={id} className={className} />;
          })}
        </div>
      )}
    </div>
  );
};

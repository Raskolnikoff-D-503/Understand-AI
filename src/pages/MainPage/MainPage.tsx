import React, {useCallback, useMemo} from 'react';
import {DefaultComponentProps, WidgetProps, WidgetStoreType} from '@/shared/types';
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
import {WIDGET_IDS} from '@/shared/constants';

import './MainPage.scss';

const WIDGETS_STORE: WidgetStoreType = {
  [WIDGET_IDS.STORED_LEARNING_RESOURCES_WIDGET]: SavedLearningResourcesWidget,
  [WIDGET_IDS.STUDIES_GRAPHS_WIDGET]: StudiesGraphsWidget,
  [WIDGET_IDS.CHAT_GPT_WIDGET]: ChatGPTWidget,
  [WIDGET_IDS.STORED_CHAT_GPT_REPLIES_WIDGET]: SavedChatGPTRepliesWidget,
  [WIDGET_IDS.LEARNING_RESOURCES_WIDGET]: LearningResourcesWidget,
};

const DEFAULT_ORDER: DefaultComponentProps[] = [
  {
    id: WIDGET_IDS.STORED_LEARNING_RESOURCES_WIDGET,
    className: 'main-page__card',
  },
  {
    id: WIDGET_IDS.STUDIES_GRAPHS_WIDGET,
    className: 'main-page__card',
  },
  {
    id: WIDGET_IDS.CHAT_GPT_WIDGET,
    className: 'main-page__card',
  },
  {
    id: WIDGET_IDS.STORED_CHAT_GPT_REPLIES_WIDGET,
    className: 'main-page__card',
  },
  {
    id: WIDGET_IDS.LEARNING_RESOURCES_WIDGET,
    className: 'main-page__card main-page__card--full-width',
  },
];

export const MainPage = () => {
  const [widgets, setWidgets] = useLocalStorage<DefaultComponentProps[]>('widgets', DEFAULT_ORDER);

  const configuratedItems = useMemo<WidgetProps[]>(
    () => widgets.map((item) => ({...item, Component: WIDGETS_STORE[item.id]})),
    [widgets],
  );

  const isOnEdit = useAppSelector(selectIsOnEdit);

  const updateDataHandler = useCallback((data: WidgetProps[]) => {
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

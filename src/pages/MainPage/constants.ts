import {StoreDataType, WidgetComponentType} from '@/shared/types';
import {
  ChatGPTWidget,
  LearningResourcesWidget,
  SavedChatGPTRepliesWidget,
  SavedLearningResourcesWidget,
  StudiesGraphsWidget,
} from '@/widgets';
import {WIDGET_IDS} from '@/shared/constants';

export const WIDGETS_STORE: WidgetComponentType = {
  [WIDGET_IDS.STORED_LEARNING_RESOURCES_WIDGET]: SavedLearningResourcesWidget,
  [WIDGET_IDS.STUDIES_GRAPHS_WIDGET]: StudiesGraphsWidget,
  [WIDGET_IDS.CHAT_GPT_WIDGET]: ChatGPTWidget,
  [WIDGET_IDS.STORED_CHAT_GPT_REPLIES_WIDGET]: SavedChatGPTRepliesWidget,
  [WIDGET_IDS.LEARNING_RESOURCES_WIDGET]: LearningResourcesWidget,
};

export const DEFAULT_ORDER: StoreDataType[] = [
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

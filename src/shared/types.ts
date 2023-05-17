import {SIZE, STYLE_TYPE, WIDGET_IDS} from './constants';

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

export type SizeType = (typeof SIZE)[keyof typeof SIZE];
export type StyleType = (typeof STYLE_TYPE)[keyof typeof STYLE_TYPE];

export type WidgetIdType = (typeof WIDGET_IDS)[keyof typeof WIDGET_IDS];

export type StoreDataType = {
  id: string;
  className: string;
};

export type WidgetDataType = {
  id: string;
  className: string;
  Component: ({id, className}: StoreDataType) => JSX.Element;
};

export type WidgetComponentType = {
  [key: string]: ({id, className}: StoreDataType) => JSX.Element;
};

export type LearningResourceType = {
  id: string;
  title: string;
  excerpt: string;
  url: string;
};

export type LearningResourceDirectoryType = {
  id: string;
  items: LearningResourceType[];
};

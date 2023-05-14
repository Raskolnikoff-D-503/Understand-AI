import {SIZE, STYLE_TYPE, WIDGET_IDS} from './constants';

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

export type SizeType = (typeof SIZE)[keyof typeof SIZE];
export type StyleType = (typeof STYLE_TYPE)[keyof typeof STYLE_TYPE];

export type WidgetIdType = (typeof WIDGET_IDS)[keyof typeof WIDGET_IDS];

export type DefaultComponentProps = {
  id: string;
  className: string;
};

export type WidgetProps = {
  id: string;
  className: string;
  Component: ({id, className}: DefaultComponentProps) => JSX.Element;
};

export type WidgetStoreType = {
  [key: string]: ({id, className}: DefaultComponentProps) => JSX.Element;
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

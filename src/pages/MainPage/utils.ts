import {StoreDataType, WidgetDataType} from '@/shared/types';
import {WIDGETS_STORE} from './constants';

export const getWidgetsDataById = (items: StoreDataType[]): WidgetDataType[] =>
  items.map((item) => ({...item, Component: WIDGETS_STORE[item.id]}));

export const getStoreData = (items: WidgetDataType[]): StoreDataType[] =>
  items.map((item) => ({id: item.id, className: item.className}));

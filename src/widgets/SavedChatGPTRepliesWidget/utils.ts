import {WidgetDataType} from '@/shared/types';
import {ResponseItem} from '@/app/services/localStorageController/hooks';

export const getSortedResponseItems = (items: ResponseItem[], data: WidgetDataType[]) => {
  const ids = data.map((item) => item.id);
  const sortedItems = items.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));

  return sortedItems;
};

import {LearningResourceDirectoryType, WidgetDataType} from '@/shared/types';

export const getSortedResponseItems = (
  items: LearningResourceDirectoryType[],
  data: WidgetDataType[],
) => {
  const ids = data.map((item) => item.id);
  const sortedItems = items.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));

  return sortedItems;
};

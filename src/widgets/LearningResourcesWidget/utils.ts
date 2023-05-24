import {LearningResourceDirectoryType, Optional} from '@/shared/types';

export const getIdList = (data: LearningResourceDirectoryType[]): string[] => {
  return data.reduce<string[]>((acc, curr) => {
    const itemIds = curr.items.map((item) => item.id);

    return [...acc, ...itemIds];
  }, []);
};

export const getDirectoryById = (
  data: LearningResourceDirectoryType[],
  id: string,
): Optional<LearningResourceDirectoryType> => {
  return data.find((el) => el.items.some((item) => item.id === id));
};

export const filterListById = (
  data: LearningResourceDirectoryType[],
  directory: LearningResourceDirectoryType,
  id: string,
): LearningResourceDirectoryType[] => {
  return data.map((item) =>
    item.id === directory.id ? {...item, items: item.items.filter((el) => el.id !== id)} : item,
  );
};

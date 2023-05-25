import React, {useCallback} from 'react';
import {LearningResourceType} from '@/shared/types';
import {LOCAL_STORAGE, useLocalStorage} from '@/app/services/localStorageController/hooks';
import {LearningResourceForm} from '@/entities/LearningResources';

type Props = {
  data: LearningResourceType;
  onClose: () => void;
};

export const CreateLearningResource = ({data, onClose}: Props) => {
  const [savedResources, setSavedResources] = useLocalStorage<
    {
      id: string;
      items: LearningResourceType[];
    }[]
  >(LOCAL_STORAGE.LEARNING_RESOURCES, []);

  const onSaveResource = useCallback((data: LearningResourceType, directory: string) => {
    const directoryExists = savedResources.find((item) => item.id === directory);

    if (directoryExists) {
      const updatedData = savedResources.map((item) =>
        item.id === directory ? {...item, items: [...item.items, data]} : item,
      );

      setSavedResources(updatedData);
    } else {
      setSavedResources([...savedResources, {id: directory, items: [data]}]);
    }
  }, []);

  return <LearningResourceForm data={data} onSave={onSaveResource} onClose={onClose} />;
};

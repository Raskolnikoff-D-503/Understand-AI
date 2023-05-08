import React, {useCallback, useState} from 'react';
import {SingleValue} from 'react-select';
import {useLocalStorage} from '@/app/services/localStorageController/hooks';
import {LearningResourceType} from './LearningResourcesWidget';
import {Button, CustomSelect, Title} from '@/shared/UI';
import {SIZE} from '@/shared/constants';

import './LearningResourceForm.scss';

type Props = {
  data: LearningResourceType;
  onCloseModal: () => void;
};

export const LearningResourceForm = ({data, onCloseModal}: Props) => {
  const [currentDirectory, setCurrentDirectory] =
    useState<SingleValue<{label: string; value: string}>>(null);

  const [savedResources, setSavedResources] = useLocalStorage<
    {
      id: string;
      items: LearningResourceType[];
    }[]
  >('learning-resources', []);

  const [options, setOptions] = useLocalStorage<{label: string; value: string}[]>(
    'directory-options',
    [],
  );

  const onOptionChange = useCallback(
    (value: SingleValue<{label: string; value: string}>) => {
      if (value && !options.find((el) => el.value === value.value)) {
        setOptions([...options, value]);
      }

      if (!value) {
        setOptions(options.filter((item) => item.value !== currentDirectory?.value));
      }

      setCurrentDirectory(value);
    },
    [options, currentDirectory],
  );

  const onSave = useCallback(() => {
    if (data && currentDirectory?.value) {
      const directoryExists = savedResources.find((item) => item.id === currentDirectory.value);

      if (directoryExists) {
        const updatedData = savedResources.map((item) =>
          item.id === currentDirectory.value ? {...item, items: [...item.items, data]} : item,
        );

        setSavedResources(updatedData);
      } else {
        setSavedResources([...savedResources, {id: currentDirectory.value, items: [data]}]);
      }

      onCloseModal();
    }
  }, [data, currentDirectory]);

  return (
    <div className="learning-resources-modal-form">
      <CustomSelect
        value={currentDirectory}
        options={options}
        onChange={onOptionChange}
        placeholder={'Type To Create New Directory...'}
      />
      <div className="learning-resources-modal-form__content">
        <Title size={SIZE.SMALL} noPadding>
          {data.title}
        </Title>
        <p>{data.excerpt}</p>
      </div>
      <Button onClick={onSave} disabled={!data && !currentDirectory}>
        Save
      </Button>
    </div>
  );
};

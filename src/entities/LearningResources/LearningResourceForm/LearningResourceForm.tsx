import React, {useCallback, useState} from 'react';
import {SingleValue} from 'react-select';
import {LearningResourceType} from '@/shared/types';
import {LOCAL_STORAGE, useLocalStorage} from '@/app/services/localStorageController/hooks';
import {Button, CustomSelect, Title} from '@/shared/UI';
import {SIZE} from '@/shared/constants';

import './LearningResourceForm.scss';

type Props = {
  data: LearningResourceType;
  onSave: (data: LearningResourceType, directory: string) => void;
  onClose: () => void;
};

export const LearningResourceForm = ({data, onSave, onClose}: Props) => {
  const [currentDirectory, setCurrentDirectory] =
    useState<SingleValue<{label: string; value: string}>>(null);

  const [options, setOptions] = useLocalStorage<{label: string; value: string}[]>(
    LOCAL_STORAGE.DIRECTORY_OPTIONS,
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

  const onSaveResource = useCallback(() => {
    if (currentDirectory?.value) {
      onSave(data, currentDirectory.value);
      onClose();
    }
  }, [currentDirectory]);

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
      <div className="learning-resources-modal-form__button-container">
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSaveResource} disabled={!data && !currentDirectory}>
          Save
        </Button>
      </div>
    </div>
  );
};

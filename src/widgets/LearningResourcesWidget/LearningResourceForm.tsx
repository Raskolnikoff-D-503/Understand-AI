import React, {useCallback, useState} from 'react';
import {SingleValue} from 'react-select';
import {useLocalStorage} from '@/app/services/localStorageController/hooks';
import {LearningResourceType} from './LearningResourcesWidget';
import {Button, CustomSelect, Title} from '@/shared/UI';
import {SIZE} from '@/shared/constants';

import './LearningResourceForm.scss';

type Props = {
  data: LearningResourceType | null;
};

export const LearningResourceForm = ({data}: Props) => {
  const [currentDirectory, setCurrentDirectory] =
    useState<SingleValue<{label: string; value: string}>>(null);

  const [options, setOptions] = useLocalStorage<{label: string; value: string}[]>(
    'directory-options',
    [],
  );

  const mock = {
    id: 'Analyzing Recent COVID-19 Trends Using Python | COVID-19 Data Analysis | Python Training | Edureka0',
    excerpt:
      'Data Scientist Masters Program: https://www.edureka.co/masters-program/data-scientist-certification This Edureka video on "Analyzing Recent COVID-19 Trends using Python", will help you understand how to, collect,  pre-process, and visualize raw data so as to derive insights from it. Following topics',
    title:
      'Analyzing Recent COVID-19 Trends Using Python | COVID-19 Data Analysis | Python Training | Edureka',
    url: 'https://youtube.com/watch?v=3ZacJ9zRVOU',
  };

  const onOptionChange = useCallback(
    (value: SingleValue<{label: string; value: string}>) => {
      if (value && !options.find((el) => el.value === value.value)) {
        setOptions([...options, value]);
      }

      console.log(value);

      if (!value) {
        setOptions(options.filter((item) => item.value !== currentDirectory?.value));
      }

      setCurrentDirectory(value);
    },
    [options, currentDirectory],
  );

  const onSave = useCallback(() => {}, [data, currentDirectory]);

  return (
    <div className="learning-resources-modal-form">
      <CustomSelect value={currentDirectory} options={options} onChange={onOptionChange} />
      <div className="learning-resources-modal-form__content">
        <Title size={SIZE.SMALL} noPadding>
          {mock.title}
        </Title>
        <p>{mock.excerpt}</p>
      </div>
      <Button onClick={onSave} disabled={!data && !currentDirectory}>
        Save
      </Button>
    </div>
  );
};

import React from 'react';
import {LearningResourceType} from './LearningResourcesWidget';
import {Button, Title} from '@/shared/UI';

import './LearningResourceForm.scss';
import {SIZE} from '@/shared/constants';

type Props = {
  data: LearningResourceType | null;
};

export const LearningResourceForm = ({data}: Props) => {
  const mock = {
    id: 'Analyzing Recent COVID-19 Trends Using Python | COVID-19 Data Analysis | Python Training | Edureka0',
    excerpt:
      'Data Scientist Masters Program: https://www.edureka.co/masters-program/data-scientist-certification This Edureka video on "Analyzing Recent COVID-19 Trends using Python", will help you understand how to, collect,  pre-process, and visualize raw data so as to derive insights from it. Following topics',
    title:
      'Analyzing Recent COVID-19 Trends Using Python | COVID-19 Data Analysis | Python Training | Edureka',
    url: 'https://youtube.com/watch?v=3ZacJ9zRVOU',
  };

  console.log('data', data);
  return (
    <div className="learning-resources-modal-form">
      <div className="learning-resources-modal-form__content">
        <Title size={SIZE.SMALL} noPadding>
          {mock.title}
        </Title>
        <p>{mock.excerpt}</p>
      </div>
      <Button disabled={!data}>Save</Button>
    </div>
  );
};

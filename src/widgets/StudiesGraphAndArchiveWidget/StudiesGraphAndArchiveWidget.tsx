import React, {useMemo} from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions, ChartData} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import {useAppSelector} from '@/app/store';
import {selectIsOnEdit} from '@/app/services/mainPageController/mainPageSlice';
import {useReadLocalStorage} from '@/app/services/localStorageController/hooks';
import {LearningResourceType} from '../LearningResourcesWidget/LearningResourcesWidget';
import {Card} from '@/shared/UI';

import './StudiesGraphAndArchiveWidget.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  id: string;
  className: string;
};

const options: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {legend: {position: 'right'}},
  aspectRatio: 1,
};

export const StudiesGraphAndArchiveWidget = ({id, className}: Props) => {
  const isDraggable = useAppSelector(selectIsOnEdit);

  const learningResources =
    useReadLocalStorage<{id: string; items: LearningResourceType[]}[]>('learning-resources');

  const configuratedItems = useMemo(
    () =>
      learningResources?.map((item) => ({
        label: item.id,
        data: item.items.length,
        backgroundColor: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
          Math.random() * 255
        })`,
      })) ?? [],
    [learningResources],
  );

  const data = useMemo<ChartData<'doughnut'>>(
    () => ({
      labels: configuratedItems.map((item) => item.label),
      datasets: [
        {
          data: configuratedItems.map((item) => item.data),
          backgroundColor: configuratedItems.map((item) => item.backgroundColor),
          hoverOffset: 4,
        },
      ],
    }),
    [configuratedItems],
  );

  return (
    <Card
      id={id}
      className={`studies-graph-and-archive-widget ${className}`}
      title="Some Chart With Important Data"
      isDraggable={isDraggable}
    >
      <div className="studies-graph-and-archive-widget__container">
        <div className="studies-graph-and-archive-widget__chart-wrapper">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </Card>
  );
};

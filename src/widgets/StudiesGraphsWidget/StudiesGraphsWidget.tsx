import React, {useMemo} from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions, ChartData} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import {useAppSelector} from '@/app/store';
import {selectIsOnEdit} from '@/app/services/mainPageController/mainPageSlice';
import {useReadLocalStorage} from '@/app/services/localStorageController/hooks';
import {LearningResourceType} from '../LearningResourcesWidget/LearningResourcesWidget';
import {Card, EmptyState} from '@/shared/UI';

import './StudiesGraphsWidget.scss';

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

const COLORS = [
  '#a0db8e',
  '#afeeee',
  '#c39797',
  '#ff7373',
  '#008080',
  '#ffc0cb',
  '#b4eeb4',
  '#f6546a',
  '#ffc3a0',
  '#b0e0e6',
];

export const StudiesGraphsWidget = ({id, className}: Props) => {
  const isDraggable = useAppSelector(selectIsOnEdit);

  const learningResources =
    useReadLocalStorage<{id: string; items: LearningResourceType[]}[]>('learning-resources');

  const configuratedItems = useMemo(
    () =>
      learningResources
        ?.filter((item) => item.items.length)
        .map((item, index) => ({
          label: item.id,
          data: item.items.length,
          backgroundColor:
            COLORS[index] ??
            `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
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
      className={`studies-graphs-widget ${className}`}
      title="Saved Learnind Resources Chart"
      isDraggable={isDraggable}
    >
      <div className="studies-graphs-widget__container">
        {Boolean(configuratedItems.length) && (
          <div className="studies-graphs-widget__chart-wrapper">
            <Doughnut data={data} options={options} />
          </div>
        )}
        {!configuratedItems.length && <EmptyState message="No Saved Data Yet" />}
      </div>
    </Card>
  );
};

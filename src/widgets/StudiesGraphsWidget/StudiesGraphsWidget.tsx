import React, {useMemo} from 'react';
import {LearningResourceType} from '@/shared/types';
import {useAppSelector} from '@/app/store';
import {selectIsOnEdit} from '@/app/services/mainPageController/mainPageSlice';
import {LOCAL_STORAGE, useReadLocalStorage} from '@/app/services/localStorageController/hooks';
import {useWindowWidth} from './hooks/useWindowWidth';
import {
  Card,
  DoughnutChart,
  DoughnutChartOptions,
  DoughnutChartType,
  EmptyState,
} from '@/shared/UI';
import {POSITION} from '@/shared/constants';
import {CHART_COLORS, WINDOW_SIZE_WIDTH} from './constants';

import './StudiesGraphsWidget.scss';

type Props = {
  id: string;
  className: string;
};

export const StudiesGraphsWidget = ({id, className}: Props) => {
  const isDraggable = useAppSelector(selectIsOnEdit);

  const windowWidth = useWindowWidth();
  const learningResources = useReadLocalStorage<{id: string; items: LearningResourceType[]}[]>(
    LOCAL_STORAGE.LEARNING_RESOURCES,
  );

  const options = useMemo<DoughnutChartOptions>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {position: windowWidth <= WINDOW_SIZE_WIDTH ? POSITION.BOTTOM : POSITION.RIGHT},
      },
    }),
    [windowWidth],
  );

  const configuratedItems = useMemo(
    () =>
      learningResources
        ?.filter((item) => item.items.length)
        .map((item, index) => ({
          label: item.id,
          data: item.items.length,
          backgroundColor: CHART_COLORS[index % 10],
        })) ?? [],
    [learningResources],
  );

  const data = useMemo<DoughnutChartType>(
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
      title="Studies Chart"
      isDraggable={isDraggable}
    >
      <div className="studies-graphs-widget__container">
        {Boolean(configuratedItems.length) && <DoughnutChart data={data} options={options} />}
        {!configuratedItems.length && <EmptyState message="No Saved Data Yet" />}
      </div>
    </Card>
  );
};

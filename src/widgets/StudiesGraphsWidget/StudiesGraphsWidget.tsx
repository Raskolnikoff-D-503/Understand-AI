import React, {useMemo} from 'react';
import {LearningResourceDirectoryType} from '@/shared/types';
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
import {StudiesGraphType, getDoughnutChartData, getFilteredItems} from './utils';
import {WINDOW_SIZE_WIDTH} from './constants';

import './StudiesGraphsWidget.scss';

type Props = {
  id: string;
  className: string;
};

export const StudiesGraphsWidget = ({id, className}: Props) => {
  const isDraggable = useAppSelector(selectIsOnEdit);

  const windowWidth = useWindowWidth();
  const learningResources = useReadLocalStorage<LearningResourceDirectoryType[]>(
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

  const configuratedItems = useMemo<StudiesGraphType[]>(
    () => getFilteredItems(learningResources),
    [learningResources],
  );

  const data = useMemo<DoughnutChartType>(
    () => getDoughnutChartData(configuratedItems),
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

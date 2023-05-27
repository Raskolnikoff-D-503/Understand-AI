import {LearningResourceDirectoryType, Nullable} from '@/shared/types';
import {DoughnutChartType} from '@/shared/UI';
import {CHART_COLORS} from './constants';

export type StudiesGraphType = {
  label: string;
  data: number;
  backgroundColor: string;
};

export const getFilteredItems = (
  data: Nullable<LearningResourceDirectoryType[]>,
): StudiesGraphType[] =>
  data
    ?.filter((item) => item.items.length)
    .map((item, index) => ({
      label: item.id,
      data: item.items.length,
      backgroundColor: CHART_COLORS[index % 10],
    })) ?? [];

export const getDoughnutChartData = (data: StudiesGraphType[]): DoughnutChartType => ({
  labels: data.map((item) => item.label),
  datasets: [
    {
      data: data.map((item) => item.data),
      backgroundColor: data.map((item) => item.backgroundColor),
      hoverOffset: 4,
    },
  ],
});

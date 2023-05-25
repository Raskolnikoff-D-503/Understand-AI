import React from 'react';
import {Chart as ChartJS, ChartData, ChartOptions, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';

import './DoughnutChart.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

export type DoughnutChartType = ChartData<'doughnut'>;
export type DoughnutChartOptions = ChartOptions<'doughnut'>;

type Props = {
  data: DoughnutChartType;
  options: DoughnutChartOptions;
};

export const DoughnutChart = ({data, options}: Props) => {
  return (
    <div className="doughnut-chart__wrapper">
      <Doughnut data={data} options={options} />
    </div>
  );
};

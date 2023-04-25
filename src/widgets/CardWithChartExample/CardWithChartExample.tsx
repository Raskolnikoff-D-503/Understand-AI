import React from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions, ChartData} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import {Card, Title} from '@/shared/UI';
import {SIZE} from '@/shared/constants';

import './CardWithChartExample.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  id: string;
  className: string;
};

const data: ChartData<'doughnut'> = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
      hoverOffset: 4,
    },
  ],
};

const options: ChartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {legend: {position: 'right'}},
  aspectRatio: 2,
};

export const CardWithChartExample = ({id, className}: Props) => {
  return (
    <Card id={id} className={`card-with-chart ${className}`}>
      <Title size={SIZE.SMALL}>Some Chart With Important Data</Title>
      <div className="card-with-chart__container">
        <Doughnut data={data} options={options} />
      </div>
    </Card>
  );
};

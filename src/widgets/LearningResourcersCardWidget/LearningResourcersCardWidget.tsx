import React from 'react';
import {useGetAINewsQuery} from '@/app/services/AINews/hooks';
import {Card, CustomAnchor, Title} from '@/shared/UI';
import {SIZE} from '@/shared/constants';

import './LearningResourcersCardWidget.scss';

type Props = {
  id: string;
  className: string;
};

// const cardItems = [
//   {
//     id: '123',
//     title: 'Despite the early',
//     description:
//       'Despite the early recovery seen at the start of the year, following 2022’s resolute bear, a sustained bull rally has failed to materialize since. Weighed down by an uncertain global economic backdrop and the prospect of a recession, market conditions have been volatile, with investors seeking clear signals on the market’s direction.',
//     to: '/',
//   },
//   {
//     id: '234',
//     title: 'Despite the early',
//     description:
//       'Well, according to Carson Group chief market strategist Ryan Detrick, there are plenty of them flashing brightly right now. In contrast to those predicting rough days ahead, Detrick believes there are just too many positive signs indicating more upside is in the cards.',
//     to: '/',
//   },
//   {
//     id: '345',
//     title: 'Despite the early',
//     description:
//       'The economy is adding jobs by the truckload, technical signals are bullish, and the solid start to the year – when the S&P 500 delivers positive returns in January, 86% of the time, the rest of the year pushes higher– all, along with other signs, combine to paint a bullish picture.',
//     to: '/',
//   },
//   {
//     id: '456',
//     title: 'Despite the early',
//     description:
//       'So, with a potential surge on the horizon, let’s take a look at three names which could be in line for a well-deserved bounce, at least according to some Street analysts. These are stocks which have retreated significantly this year, with all down by 50% or more. Yet, according to TipRanks’ database, each also features a Strong Buy analyst consensus rating and a powerful upside potential',
//     to: '/',
//   },
//   {
//     id: '567',
//     title: 'Despite the early',
//     description:
//       'We’ll start in the chip sector with Semtech, a leading provider of analog and mixed-signal semiconductors along with advanced algorithms. These offerings are designed to be used in commercial applications, and target various segments, including consumer, communications, enterprise computing, and industrial end-markets. Semtech operates via four distinct business units; Signal Integrity Products Group, Advanced Protection and Sensing Products Group, IoT System Products Group, and IoT Connected Services Group.',
//     to: '/',
//   },
//   {
//     id: '678',
//     title: 'Despite the early',
//     description:
//       'Semtech shares have been under severe pressure over the past year and are down 66% as a series of disappointing quarterly outlooks have riled investors.',
//     to: '/',
//   },
// ];

const PAGE_NUMBER = 1;

export const LearningResourcersCardWidget = ({id, className}: Props) => {
  const {data, error, isLoading} = useGetAINewsQuery(PAGE_NUMBER);

  console.log(data, error, isLoading);

  return (
    <Card
      id={id}
      className={`learning-recourses-card-widget ${className}`}
      title={data?.title}
      isDraggable
    >
      <ul className="learning-recourses-card-widget__list">
        {data?.value.map(
          (item) =>
            item.title && (
              <li key={item.excerpt}>
                <CustomAnchor className="learning-recourses-card-widget__anchor" href={item.webUrl}>
                  <Title size={SIZE.SMALL} noPadding>
                    {item.title}
                  </Title>
                  <div className="learning-recourses-card-widget__description">{item.excerpt}</div>
                </CustomAnchor>
              </li>
            ),
        )}
      </ul>
    </Card>
  );
};

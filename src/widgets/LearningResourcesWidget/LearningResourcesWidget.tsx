import React, {useCallback, useState} from 'react';
import {useAppSelector} from '@/app/store';
import {selectIsOnEdit} from '@/app/services/mainPageController/mainPageSlice';
import {useGetLearningResourcesQuery} from '@/app/services/learningResources/hooks';
import {Card, ListContentLoader, CustomAnchor, EmptyState, List, Title} from '@/shared/UI';
import {Pagination} from '@/shared/UI/Pagination/Pagination';
import {removeEmojis} from '@/shared/utils';
import {SIZE} from '@/shared/constants';

import './LearningResourcesWidget.scss';

type Props = {
  id: string;
  className: string;
};

const DEFAULT_PAGE_NUMBER = 1;

export const LearningResourcesWidget = ({id, className}: Props) => {
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE_NUMBER);

  const isDraggable = useAppSelector(selectIsOnEdit);

  const {data, error, isLoading} = useGetLearningResourcesQuery(currentPage);

  const onPageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <Card
      id={id}
      className={`learning-recources-widget ${className}`}
      title={data?.title}
      error={error}
      loaderConfig={{
        isLoading: isLoading,
        Component: <ListContentLoader isTitle={true} />,
      }}
      isDraggable={isDraggable}
    >
      <div className="learning-recources-widget__container">
        <List>
          {Boolean(data?.value.length) ? (
            data?.value.map((item) => (
              <CustomAnchor key={item.excerpt} href={item.originalUrl || item.webUrl}>
                <li className="learning-recources-widget__list-item">
                  <Title size={SIZE.SMALL} noPadding>
                    {item.title}
                  </Title>
                  <p>{removeEmojis(item.excerpt)}</p>
                </li>
              </CustomAnchor>
            ))
          ) : (
            <EmptyState />
          )}
        </List>

        <Pagination
          currentPage={data?.page ?? 0}
          nextPage={data?.nextPage}
          onPageChange={onPageChange}
        />
      </div>
    </Card>
  );
};

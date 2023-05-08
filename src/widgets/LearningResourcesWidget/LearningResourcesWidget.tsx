import React, {useCallback, useState} from 'react';
import {useAppSelector} from '@/app/store';
import {selectIsOnEdit} from '@/app/services/mainPageController/mainPageSlice';
import {useGetLearningResourcesQuery} from '@/app/services/learningResources/hooks';
import {Card, ListContentLoader, CustomAnchor, EmptyState, List, Title, Modal} from '@/shared/UI';
import {Pagination} from '@/shared/UI/Pagination/Pagination';
import {LearningResourceForm} from './LearningResourceForm';
import {SaveIcon} from '@/shared/icons';
import {removeEmojis} from '@/shared/utils';
import {SIZE} from '@/shared/constants';

import './LearningResourcesWidget.scss';

type Props = {
  id: string;
  className: string;
};

export type LearningResourceType = {
  id: string;
  title: string;
  excerpt: string;
  url: string;
};

const DEFAULT_PAGE_NUMBER = 1;

export const LearningResourcesWidget = ({id, className}: Props) => {
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE_NUMBER);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [currentItem, setCurrentItem] = useState<LearningResourceType | null>(null);

  const isDraggable = useAppSelector(selectIsOnEdit);

  const {data, error, isLoading} = useGetLearningResourcesQuery(currentPage);

  console.log(error);

  const onPageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const onSaveClick = useCallback((item: LearningResourceType) => {
    if (item) {
      setCurrentItem(item);
      setIsOpen(true);
    }
  }, []);

  const onCloseModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <Card
      id={id}
      className={`learning-recources-widget ${className}`}
      title={data?.title}
      // error={error}
      loaderConfig={{
        isLoading: isLoading,
        Component: <ListContentLoader isTitle={true} />,
      }}
      isDraggable={isDraggable}
    >
      <div className="learning-recources-widget__container">
        <List>
          {Boolean(data?.value.length) ? (
            data?.value.map((item, index) => {
              const id = `${item.title}${index}`;

              return (
                <li key={id} className="learning-recources-widget__list-item">
                  <CustomAnchor href={item.originalUrl || item.webUrl}>
                    <div className="learning-recources-widget__content">
                      <Title size={SIZE.SMALL} noPadding>
                        {item.title}
                      </Title>
                      <p>{removeEmojis(item.excerpt)}</p>
                    </div>
                  </CustomAnchor>
                  <div
                    className="learning-recources-widget__icon-wrapper"
                    onClick={() =>
                      onSaveClick({
                        id,
                        title: item.title,
                        excerpt: removeEmojis(item.excerpt),
                        url: item.originalUrl || item.webUrl,
                      })
                    }
                  >
                    <SaveIcon />
                  </div>
                </li>
              );
            })
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
      {isOpen && currentItem !== null && (
        <Modal id="learning-resources-modal-form" handleModalClose={onCloseModal}>
          <LearningResourceForm data={currentItem} onCloseModal={onCloseModal} />
        </Modal>
      )}
    </Card>
  );
};

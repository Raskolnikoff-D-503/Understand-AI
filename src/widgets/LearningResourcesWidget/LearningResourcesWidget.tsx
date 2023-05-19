import React, {useCallback, useMemo, useState} from 'react';
import {LearningResourceDirectoryType, LearningResourceType, Nullable} from '@/shared/types';
import {useAppSelector} from '@/app/store';
import {selectIsOnEdit} from '@/app/services/mainPageController/mainPageSlice';
import {useGetLearningResourcesQuery} from '@/app/services/learningResources/hooks';
import {useLocalStorage} from '@/app/services/localStorageController/hooks';
import {Card, ListContentLoader, CustomAnchor, EmptyState, List, Title, Modal} from '@/shared/UI';
import {Pagination} from '@/shared/UI/Pagination/Pagination';
import {LearningResourceForm} from './LearningResourceForm';
import {SaveIcon, SavedIcon} from '@/shared/icons';
import {isNull, removeEmojis} from '@/shared/utils';
import {SIZE} from '@/shared/constants';

import './LearningResourcesWidget.scss';

type Props = {
  id: string;
  className: string;
};

const DEFAULT_PAGE_NUMBER = 1;

export const LearningResourcesWidget = ({id, className}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE_NUMBER);
  const [currentItem, setCurrentItem] = useState<Nullable<LearningResourceType>>(null);

  const isDraggable = useAppSelector(selectIsOnEdit);

  const [savedResources, setSavedResources] = useLocalStorage<LearningResourceDirectoryType[]>(
    'learning-resources',
    [],
  );

  const {data, error, isLoading} = useGetLearningResourcesQuery(currentPage);

  const ids = useMemo(
    () =>
      savedResources.reduce<string[]>((acc, curr) => {
        const itemIds = curr.items.map((item) => item.id);

        return [...acc, ...itemIds];
      }, []),
    [savedResources],
  );

  const onPageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const onSaveClick = useCallback((item: LearningResourceType) => {
    if (item) {
      setCurrentItem(item);
      setIsOpen(true);
    }
  }, []);

  const onDeleteClick = useCallback(
    (id: string) => {
      const directory = savedResources.find((el) => el.items.some((item) => item.id === id));

      if (directory) {
        setSavedResources(
          savedResources.map((item) =>
            item.id === directory.id
              ? {...item, items: item.items.filter((el) => el.id !== id)}
              : item,
          ),
        );
      }
    },
    [savedResources],
  );

  const onCloseModal = useCallback(() => {
    setIsOpen(false);
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
            data?.value.map((item, index) => {
              const itemId = `${item.title}${index}`;

              return (
                <li key={itemId} className="learning-recources-widget__list-item">
                  <CustomAnchor href={item.originalUrl || item.webUrl}>
                    <div className="learning-recources-widget__content">
                      <Title size={SIZE.SMALL} noPadding>
                        {item.title}
                      </Title>
                      <p>{removeEmojis(item.excerpt)}</p>
                    </div>
                  </CustomAnchor>
                  {ids.find((id) => id === itemId) ? (
                    <div
                      className="learning-recources-widget__icon-wrapper"
                      onClick={() => onDeleteClick(itemId)}
                    >
                      <SavedIcon />
                    </div>
                  ) : (
                    <div
                      className="learning-recources-widget__icon-wrapper"
                      onClick={() =>
                        onSaveClick({
                          id: itemId,
                          title: item.title,
                          excerpt: removeEmojis(item.excerpt),
                          url: item.originalUrl || item.webUrl,
                        })
                      }
                    >
                      <SaveIcon />
                    </div>
                  )}
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
      {!isNull(currentItem) && (
        <Modal id="learning-resources-modal-form" isOpen={isOpen} handleModalClose={onCloseModal}>
          <LearningResourceForm data={currentItem} onCloseModal={onCloseModal} />
        </Modal>
      )}
    </Card>
  );
};

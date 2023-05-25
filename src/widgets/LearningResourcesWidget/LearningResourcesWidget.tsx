import React, {useCallback, useMemo, useState} from 'react';
import {LearningResourceDirectoryType, LearningResourceType, Nullable} from '@/shared/types';
import {useAppSelector} from '@/app/store';
import {selectIsOnEdit} from '@/app/services/mainPageController/mainPageSlice';
import {LOCAL_STORAGE, useLocalStorage} from '@/app/services/localStorageController/hooks';
import {useGetLearningResourcesQuery} from './api/hooks';
import {CreateLearningResource, Favorites} from '@/features';
import {Card, ListContentLoader, EmptyState, List, Modal} from '@/shared/UI';
import {Pagination} from '@/shared/UI/Pagination/Pagination';
import {LearningResourceLinkItem} from '@/entities/LearningResources';
import {isNull, removeEmojis} from '@/shared/utils';
import {filterListById, getDirectoryById, getIdList} from './utils';

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
    LOCAL_STORAGE.LEARNING_RESOURCES,
    [],
  );

  const {data, error, isLoading} = useGetLearningResourcesQuery(currentPage);

  const ids = useMemo(() => getIdList(savedResources), [savedResources]);

  const onPageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const onSave = useCallback((item: LearningResourceType) => {
    if (item) {
      setCurrentItem(item);
      setIsOpen(true);
    }
  }, []);

  const onDelete = useCallback(
    (id: string) => {
      const directory = getDirectoryById(savedResources, id);

      if (directory) {
        const updatedData = filterListById(savedResources, directory, id);
        setSavedResources(updatedData);
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
          {data?.value.length ? (
            data?.value.map((item, index) => {
              const itemId = `${item.title}${index}`;

              return (
                <li key={itemId} className="learning-recources-widget__list-item">
                  <LearningResourceLinkItem
                    url={item.originalUrl || item.webUrl}
                    title={item.title}
                    excerpt={item.excerpt}
                  />
                  <Favorites
                    inFavorites={ids.some((id) => id === itemId)}
                    onSave={() =>
                      onSave({
                        id: itemId,
                        title: item.title,
                        excerpt: removeEmojis(item.excerpt),
                        url: item.originalUrl || item.webUrl,
                      })
                    }
                    onDelete={() => onDelete(itemId)}
                  />
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

        {!isNull(currentItem) && (
          <Modal id="learning-resources-modal-form" isOpen={isOpen} handleModalClose={onCloseModal}>
            <CreateLearningResource data={currentItem} onClose={onCloseModal} />
          </Modal>
        )}
      </div>
    </Card>
  );
};

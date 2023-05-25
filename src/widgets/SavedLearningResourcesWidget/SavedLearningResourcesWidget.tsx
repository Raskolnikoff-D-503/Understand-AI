import React, {useCallback, useMemo, useState} from 'react';
import {LearningResourceDirectoryType, WidgetDataType} from '@/shared/types';
import {useAppSelector} from '@/app/store';
import {selectIsOnEdit} from '@/app/services/mainPageController/mainPageSlice';
import {LOCAL_STORAGE, useLocalStorage} from '@/app/services/localStorageController/hooks';
import {SavedInfo} from '@/features';
import {Accordion, Card, IconButton} from '@/shared/UI';
import {LearningResourceLinkItem} from '@/entities/LearningResources';
import {DeleteIcon} from '@/shared/icons';
import {getSortedResponseItems} from './utils';

import './SavedLearningResourcesWidget.scss';

type Props = {
  id: string;
  className: string;
};

export const SavedLearningResourcesWidget = ({id, className}: Props) => {
  const [isOnEdit, setIsOnEdit] = useState<boolean>(false);

  const isDraggable = useAppSelector(selectIsOnEdit);

  const [items, setItems] = useLocalStorage<LearningResourceDirectoryType[]>(
    LOCAL_STORAGE.LEARNING_RESOURCES,
    [],
  );

  const onToggle = useCallback(() => {
    setIsOnEdit(!isOnEdit);
  }, [isOnEdit]);

  const onDelete = useCallback(
    (id: string, directory: string) => {
      setItems(
        items.map((item) =>
          item.id === directory ? {...item, items: item.items.filter((el) => el.id !== id)} : item,
        ),
      );
    },
    [items],
  );

  const updateDataHandler = useCallback(
    (data: WidgetDataType[]) => {
      if (items) {
        const sortedItems = getSortedResponseItems(items, data);

        setItems(sortedItems);
      }
    },
    [items],
  );

  const configuratedItems = useMemo<WidgetDataType[]>(
    () =>
      items
        ? items
            .filter((item) => item.items.length)
            .map<WidgetDataType>((item) => {
              return {
                id: item.id,
                className: 'saved-learning-resources-widget__item',
                Component: ({id, className}) => (
                  <div id={id} className={className}>
                    <Accordion title={item.id} isDraggable={isOnEdit}>
                      {item.items.map((resource) => (
                        <li
                          key={resource.id}
                          className="saved-learning-resources-widget__list-item"
                        >
                          <LearningResourceLinkItem
                            url={resource.url}
                            title={resource.title}
                            excerpt={resource.excerpt}
                          />
                          <IconButton
                            onClick={() => onDelete(resource.id, item.id)}
                            icon={<DeleteIcon />}
                          />
                        </li>
                      ))}
                    </Accordion>
                  </div>
                ),
              };
            })
        : [],
    [items, isOnEdit],
  );

  return (
    <Card id={id} className={className} isDraggable={isDraggable} title="Saved Learning Resources">
      <SavedInfo
        data={configuratedItems}
        isOnEdit={isOnEdit}
        isDraggable={isDraggable}
        onToggle={onToggle}
        onUpdate={updateDataHandler}
      />
    </Card>
  );
};

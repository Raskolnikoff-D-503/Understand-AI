import React, {useCallback, useMemo} from 'react';
import {StoreDataType, WidgetDataType} from '@/shared/types';
import {useAppSelector} from '@/app/store';
import {LOCAL_STORAGE, useLocalStorage} from '@/app/services/localStorageController/hooks';
import {selectIsOnEdit} from '@/app/services/mainPageController/mainPageSlice';
import {useDebounce} from '@/shared/hooks';
import {EditRegimeSwitcher} from '@/features';
import {getStoreData, getWidgetsDataById} from './utils';
import {DEFAULT_ORDER} from './constants';

import './MainPage.scss';

export const MainPage = () => {
  const isOnEdit = useAppSelector(selectIsOnEdit);

  const debouncedValue = useDebounce<boolean>(isOnEdit, 100);

  const [widgets, setWidgets] = useLocalStorage<StoreDataType[]>(
    LOCAL_STORAGE.WIDGETS,
    DEFAULT_ORDER,
  );
  const widgetData = useMemo<WidgetDataType[]>(() => getWidgetsDataById(widgets), [widgets]);

  const updateDataHandler = useCallback(
    (data: WidgetDataType[]) => {
      const storedData = getStoreData(data);

      setWidgets(storedData);
    },
    [debouncedValue],
  );

  return (
    <div className="main-page">
      <EditRegimeSwitcher
        className="main-page__container"
        isOnEdit={isOnEdit}
        data={widgetData}
        updateDataHandler={updateDataHandler}
      >
        <div className="main-page__container">
          {widgetData.map((item) => {
            const {id, className, Component} = item;

            return <Component id={id} key={id} className={className} />;
          })}
        </div>
      </EditRegimeSwitcher>
    </div>
  );
};

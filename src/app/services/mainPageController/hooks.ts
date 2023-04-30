import {useEffect, useState} from 'react';
import {useAppDispatch} from '@/app/store';
import {mainPageSlice} from './mainPageSlice';

export const useGetIsOnEdit = () => {
  const [isOnEdit, setIsOnEdit] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(mainPageSlice.actions.setIsOnEdit(isOnEdit));
  }, [isOnEdit]);

  return {isOnEdit, setIsOnEdit};
};

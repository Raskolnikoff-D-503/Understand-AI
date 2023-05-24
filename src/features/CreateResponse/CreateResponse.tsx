import React, {useCallback} from 'react';
import {
  NewResponseItem,
  useSaveResponseToLocalStorage,
} from '@/app/services/localStorageController/hooks';
import {ResponseForm, ResponseFormType} from '@/entities/ChatGPT';

type Props = {
  data: NewResponseItem;
  onClose: () => void;
};

export const CreateResponse = ({data, onClose}: Props) => {
  const setResponse = useSaveResponseToLocalStorage();

  const onSaveResponse = useCallback((data: ResponseFormType) => {
    const {title, content} = data;

    if (title && content) {
      setResponse({
        title,
        content,
      });

      onClose();
    }
  }, []);

  return <ResponseForm title="Save New Response" data={data} onSave={onSaveResponse} />;
};

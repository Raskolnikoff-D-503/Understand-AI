import React, {useCallback} from 'react';
import {
  NewResponseItem,
  useSaveResponseToLocalStorage,
} from '@/app/services/localStorageController/hooks';
import {ResponseForm, ResponseFormType} from '@/entities/ResponseForm/ResponseForm';

type Props = {
  response: NewResponseItem;
  onClose: () => void;
};

export const CreateResponse = ({response, onClose}: Props) => {
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

  return <ResponseForm title="Save New Response" data={response} onSave={onSaveResponse} />;
};

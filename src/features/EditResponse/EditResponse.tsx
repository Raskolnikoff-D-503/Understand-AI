import React, {useCallback} from 'react';
import {ResponseItem, useLocalStorage} from '@/app/services/localStorageController/hooks';
import {ResponseForm, ResponseFormType} from '@/entities/ChatGPT';

type Props = {
  response: ResponseItem;
  onClose: () => void;
};

export const EditResponse = ({response, onClose}: Props) => {
  const [responses, setResponses] = useLocalStorage<{id: string; title: string; content: string}[]>(
    'responses',
    [],
  );

  const onSaveResponse = useCallback((data: ResponseFormType) => {
    const {title, content} = data;

    if (title && content) {
      setResponses(
        responses.map((item) =>
          item.id === response.id ? {id: response.id, title, content} : item,
        ),
      );

      onClose();
    }
  }, []);

  return (
    <ResponseForm
      title="Save New Response"
      data={{title: response.title, content: response.content}}
      onSave={onSaveResponse}
    />
  );
};

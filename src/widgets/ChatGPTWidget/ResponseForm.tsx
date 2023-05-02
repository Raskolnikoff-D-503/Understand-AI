import React, {useCallback, useState} from 'react';
import {useSaveResponseToLocalStorage} from '@/app/services/localStorageController/hooks';
import {Button, Input, Textarea, Title} from '@/shared/UI';
import {SIZE} from '@/shared/constants';

import './ResponseForm.scss';

type Props = {
  response: string | undefined;
  onClose: () => void;
};

const OPEN_AI_GPT_3_MODEL_RESPONSE_MAX_LENGTH = 10000;
const ROWS = 10;

export const ResponseForm = ({response = '', onClose}: Props) => {
  const [inputTitle, setInputTitle] = useState<string>('');
  const [txt, setTxt] = useState<string>(response);

  const [_, setResponse] = useSaveResponseToLocalStorage();

  const onSaveResponse = useCallback(() => {
    if (txt && inputTitle) {
      setResponse({
        title: inputTitle,
        content: txt,
      });

      onClose();
    }
  }, [inputTitle, txt]);

  return (
    <div className="response-modal-form">
      <Title noPadding size={SIZE.SMALL}>
        Save Response
      </Title>
      <Input value={inputTitle} onChange={setInputTitle} />
      <Textarea
        value={txt}
        onChange={setTxt}
        maxLength={OPEN_AI_GPT_3_MODEL_RESPONSE_MAX_LENGTH}
        rows={ROWS}
      />
      <Button onClick={onSaveResponse} disabled={!txt || !inputTitle}>
        Save
      </Button>
    </div>
  );
};

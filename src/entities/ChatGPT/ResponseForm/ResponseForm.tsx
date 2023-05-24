import React, {useCallback, useState} from 'react';
import {ResponseFormType} from '@/entities/ChatGPT';
import {Button, Input, Textarea, Title} from '@/shared/UI';
import {SIZE} from '@/shared/constants';

import './ResponseForm.scss';

type Props = {
  title: string;
  data: ResponseFormType;
  onSave: (data: ResponseFormType) => void;
};

const OPEN_AI_GPT_3_MODEL_RESPONSE_MAX_LENGTH = 10000;
const ROWS = 10;

export const ResponseForm = ({title, data, onSave}: Props) => {
  const [inputTitle, setInputTitle] = useState<string>(data.title ?? '');
  const [txt, setTxt] = useState<string>(data.content ?? '');

  const onSaveResponse = useCallback(() => {
    onSave({title: inputTitle, content: txt});
  }, [inputTitle, txt]);

  return (
    <div className="response-modal-form">
      <Title noPadding size={SIZE.SMALL}>
        {title}
      </Title>
      <Input label="Title" value={inputTitle} onChange={setInputTitle} />
      <Textarea
        label="Edit Response"
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

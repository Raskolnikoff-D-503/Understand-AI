import React from 'react';
import {FetchBaseQueryError} from '@reduxjs/toolkit/dist/query';
import {SerializedError} from '@reduxjs/toolkit';
import {ErrorIcon} from '@/shared/icons';
import {isObject} from '@/shared/utils';

import './Error.scss';

type Props = {
  error: FetchBaseQueryError | SerializedError;
};

type FetchErrorData = {
  message: string;
  code: string;
};

const DEFAULT_ERROR_MESSAGE: string = 'An error has occured';

const isErrorDataWithMessage = (value: unknown): value is FetchErrorData =>
  isObject(value) && 'message' in value && 'code' in value;

const isFetchBaseQueryError = (
  value: FetchBaseQueryError | SerializedError,
): value is FetchBaseQueryError => 'status' in value;

const getErrorMessage = (error: FetchBaseQueryError | SerializedError): string => {
  if (isFetchBaseQueryError(error) && isErrorDataWithMessage(error.data)) {
    return error.data.message;
  } else {
    return DEFAULT_ERROR_MESSAGE;
  }
};

export const Error = ({error}: Props) => {
  console.log('error', error);

  return (
    <div className="error">
      <ErrorIcon />
      <p>{`${getErrorMessage(error) || DEFAULT_ERROR_MESSAGE}`}</p>
    </div>
  );
};

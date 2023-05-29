import React from 'react';
import {FetchBaseQueryError} from '@reduxjs/toolkit/dist/query';
import {SerializedError} from '@reduxjs/toolkit';
import {ErrorIcon} from '@/shared/icons';
import {Optional} from '@/shared/types';
import {isObject} from '@/shared/utils';

import './Error.scss';

type Props = {
  error: Optional<FetchBaseQueryError | SerializedError>;
};

type FetchErrorData = {
  message: string;
  code: string;
};

const DEFAULT_ERROR_MESSAGE = 'An error has occured';

const isErrorDataWithMessage = (value: unknown): value is FetchErrorData =>
  isObject(value) && 'message' in value && 'code' in value;

const isFetchBaseQueryError = (
  value: Optional<FetchBaseQueryError | SerializedError>,
): value is FetchBaseQueryError => isObject(value) && 'status' in value;

const getErrorMessage = (error: Optional<FetchBaseQueryError | SerializedError>): string => {
  if (isFetchBaseQueryError(error) && isErrorDataWithMessage(error.data)) {
    return error.data.message;
  } else {
    return DEFAULT_ERROR_MESSAGE;
  }
};

export const Error = ({error}: Props) => {
  return (
    <div className="error">
      <ErrorIcon />
      <p>{`${getErrorMessage(error) || DEFAULT_ERROR_MESSAGE}`}</p>
    </div>
  );
};

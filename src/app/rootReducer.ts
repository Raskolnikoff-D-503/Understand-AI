import {combineReducers} from '@reduxjs/toolkit';
import {googleNewsApi} from './api';

export const rootReducer = combineReducers({
  [googleNewsApi.reducerPath]: googleNewsApi.reducer,
});

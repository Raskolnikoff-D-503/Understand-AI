import {combineReducers} from '@reduxjs/toolkit';
import {googleNewsApi} from './services/googleNews/api';

export const rootReducer = combineReducers({
  [googleNewsApi.reducerPath]: googleNewsApi.reducer,
});

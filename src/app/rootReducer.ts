import {combineReducers} from '@reduxjs/toolkit';
import {googleNewsApi} from './services/googleNews/api';
import {yahooFinanceApi} from './services/yahooFinance/api';
import {AINewsApi} from './services/AINews/api';

export const rootReducer = combineReducers({
  [googleNewsApi.reducerPath]: googleNewsApi.reducer,
  [yahooFinanceApi.reducerPath]: yahooFinanceApi.reducer,
  [AINewsApi.reducerPath]: AINewsApi.reducer,
});

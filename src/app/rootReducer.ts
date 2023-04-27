import {combineReducers} from '@reduxjs/toolkit';
import {yahooFinanceApi} from './services/yahooFinance/api';
import {AINewsApi} from './services/AINews/api';

export const rootReducer = combineReducers({
  [yahooFinanceApi.reducerPath]: yahooFinanceApi.reducer,
  [AINewsApi.reducerPath]: AINewsApi.reducer,
});

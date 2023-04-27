import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
import {rootReducer} from './rootReducer';
import {yahooFinanceApi} from './services/yahooFinance/api';
import {AINewsApi} from './services/AINews/api';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([yahooFinanceApi.middleware, AINewsApi.middleware]),
});

setupListeners(store.dispatch);

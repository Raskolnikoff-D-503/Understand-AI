import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
import {rootReducer} from './rootReducer';
import {learningResourcesApi} from './services/learningResources/api';
import {chatGPTApi} from './services/chatGPT/api';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([learningResourcesApi.middleware, chatGPTApi.middleware]),
});

setupListeners(store.dispatch);

import {combineReducers} from '@reduxjs/toolkit';
import {learningResourcesApi} from './services/learningResources/api';
import {chatGPTApi} from './services/chatGPT/api';
import {mainPageSlice} from './services/mainPageController/mainPageSlice';

export const rootReducer = combineReducers({
  [chatGPTApi.reducerPath]: chatGPTApi.reducer,
  [learningResourcesApi.reducerPath]: learningResourcesApi.reducer,
  [mainPageSlice.name]: mainPageSlice.reducer,
});

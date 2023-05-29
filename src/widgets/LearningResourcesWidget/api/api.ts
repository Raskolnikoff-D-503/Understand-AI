import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

type AINewsItem = {
  title: string;
  excerpt: string;
  sourceUrl: null;
  originalUrl?: string;
  webUrl: string;
};

type AINewsDto = {
  title: string;
  value: AINewsItem[];
  page: number;
  nextPage: number;
};

export const learningResourcesApi = createApi({
  reducerPath: 'learningResourcesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ai10.p.rapidapi.com/learning/page',
    headers: {
      'content-type': 'application/octet-stream',
      'X-RapidAPI-Key': `${process.env.REACT_APP_RAPID_API_KEY}`,
      'X-RapidAPI-Host': 'ai10.p.rapidapi.com',
    },
  }),
  endpoints: (builder) => ({
    getLearningResources: builder.query<AINewsDto, number>({
      query: (page) => `/${page}/`,
    }),
  }),
});

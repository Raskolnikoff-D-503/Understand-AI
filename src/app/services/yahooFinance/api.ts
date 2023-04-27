import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const {REACT_APP_RAPID_API_KEY} = process.env;

export const yahooFinanceApi = createApi({
  reducerPath: 'yahooFinanceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete',
    headers: {
      'content-type': 'application/octet-stream',
      'X-RapidAPI-Key': `${REACT_APP_RAPID_API_KEY}`,
      'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
    },
  }),
  endpoints: (builder) => ({
    getYahooFinance: builder.query<{}, void>({query: () => '?q=tesla'}),
  }),
});

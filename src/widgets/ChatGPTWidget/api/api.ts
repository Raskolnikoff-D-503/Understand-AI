import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

type MessageChatGPT = {
  role: string;
  content: string;
};

type ChoiceChatGPT = {
  message: MessageChatGPT;
  finish_reason: string;
};

export type ChatGPTDataDto = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: ChoiceChatGPT[];
};

export const chatGPTApi = createApi({
  reducerPath: 'chatGPTApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://chatgpt53.p.rapidapi.com/',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': `${process.env.REACT_APP_RAPID_API_KEY}`,
      'X-RapidAPI-Host': 'chatgpt53.p.rapidapi.com',
    },
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getChatGPTMessage: builder.mutation<ChatGPTDataDto, string>({
      query: (payload) => ({
        url: '',
        method: 'POST',
        body: {
          messages: [
            {
              role: 'user',
              content: payload,
            },
          ],
        },
      }),
    }),
  }),
});

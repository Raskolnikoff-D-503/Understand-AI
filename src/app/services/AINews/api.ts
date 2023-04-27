import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const {REACT_APP_RAPID_API_KEY} = process.env;

/**
 * 
    "title": "AI Newsletters",
    "path": "_newsletters/",
    "page": 1,
    "value": [
        {
            "path": "_newsletters/ai-every-day-2023-04-26.html",
            "title": "A.I. Every Day (2023-04-26)",
            "type": "article",
            "sourceUrl": "https://everyday-cc.github.io/ai/api/newsletters/ai-every-day-2023-04-26/index.json",
            "webUrl": "https://everyday.cc/ai/newsletter/ai-every-day-2023-04-26/",
            "excerpt": "Microsoft shares surge 7% after the ChatGPT investor reveals AI boosted its cloud sales / How Generative AI Can Be Used In Electronics Manufacturing / Jabil is building reports with IBM Business Analytics Portfolio",
            "publishedDateTime": "2023-04-26 18:15:40 +0000",
            "images": [
                
            ],
            "locale": "en-us",
            "topics": ["AI"]
        },
      ],
 */

type AINewsItem = {
  title: string;
  excerpt: string;
  sourceUrl: null;
  webUrl: string;
};

type AINewsDto = {
  title: string;
  value: AINewsItem[];
  page: number;
  nextPage: number;
};

export const AINewsApi = createApi({
  reducerPath: 'AINewsApi',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'https://ai10.p.rapidapi.com/learning/page',
    headers: {
      'content-type': 'application/octet-stream',
      'X-RapidAPI-Key': `${REACT_APP_RAPID_API_KEY}`,
      'X-RapidAPI-Host': 'ai10.p.rapidapi.com',
    },
  }),
  endpoints: (builder) => ({
    getAINews: builder.query<AINewsDto, number>({
      query: (page) => `/${page}/`,
    }),
  }),
});

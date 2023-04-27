import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

/**
 * body: null
created_at: "2023-04-26T17:17:10.905Z"
date: "2023-04-26T17:11:41.000Z"
hostname: "vigourtimes.com"
language: "EN"
link: "https://vigourtimes.com/msft-cmg-ba-frc-more/"
props: {
  description: "The Microsoft logo displayed on their stand during the Mobile World Congress 2023 on March 2, 2023, in Barcelona, Spain. Joan Cros | Nurphoto | Getty Images Check out the companies making the biggest moves midday: Microsoft — Shares of tech giant Microsoft gained more than 8% Wednesday after a better-than-expected earnings report a day […]"
  image: "https://image.cnbcfm.com/api/v1/image/107205054-1678284715720-gettyimages-1247904413-cros-notitle230307_nplLU.jpeg?v=1682527293&w=1920&h=1080"
  locale: "en_US"
  site_name: "Vigour Times"
  title: "MSFT, CMG, BA, FRC more - Vigour Times"
  type: "article"
  url: "https://vigourtimes.com/msft-cmg-ba-frc-more/"
  source: "Vigour Times"
  title: "MSFT, CMG, BA, FRC more - Vigour Times"
}
*/

type GoogleNewsDataProps = {
  description: string;
  image: string; //url
  locale: string; //en_US
  site_name: string;
  title: string;
  type: string; //article
  url: string;
  source: string;
};

type GoogleNewsListItemType = {
  created_at: string;
  date: string;
  hostname: string;
  language: string; // EN / RU
  link: string;
  props: GoogleNewsDataProps;
};

type GoogleNewsListType = {
  total: number;
  news: GoogleNewsListItemType[];
};

type GoogleNewsDataDto = {
  success: boolean;
  news: GoogleNewsListType;
};

const {GOOGLE_NEW_API_URL} = process.env;

export const googleNewsApi = createApi({
  reducerPath: 'googleNewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${GOOGLE_NEW_API_URL}`,
    headers: {
      'content-type': 'application/octet-stream',
      'X-RapidAPI-Key': 'c7b8d0a2ffmsh13190575c527053p1b3a04jsn198f455f27ce',
      'X-RapidAPI-Host': 'google-news-api1.p.rapidapi.com',
    },
  }),
  endpoints: (builder) => ({
    getGoogleNews: builder.query<GoogleNewsDataDto, void>({query: () => '?language=EN'}),
  }),
});

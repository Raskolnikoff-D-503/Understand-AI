import {Optional} from '@/shared/types';
import {ChatGPTDataDto} from './api/api';

export const getMessage = (data: Optional<ChatGPTDataDto>): Optional<string> =>
  data?.choices.map((item) => item.message.content)?.[0];

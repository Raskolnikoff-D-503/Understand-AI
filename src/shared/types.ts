import {SIZE, TOPIC_IDS} from './constants';

export type SizeType = (typeof SIZE)[keyof typeof SIZE];
export type TopicType = (typeof TOPIC_IDS)[keyof typeof TOPIC_IDS];

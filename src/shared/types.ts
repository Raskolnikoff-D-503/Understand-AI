import {SIZE, STYLE_TYPE} from './constants';

export type SizeType = (typeof SIZE)[keyof typeof SIZE];
export type StyleType = (typeof STYLE_TYPE)[keyof typeof STYLE_TYPE];

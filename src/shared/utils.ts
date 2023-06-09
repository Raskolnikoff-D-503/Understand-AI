const EMOJIS_REGEX =
  /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;

export const removeEmojis = (str: string): string => str.replace(EMOJIS_REGEX, '');

export const isObject = (value: unknown): value is object => typeof value === 'object';

export const isUndefined = (value: unknown): value is undefined => value === undefined;
export const isNull = (value: unknown): value is null => value === null;

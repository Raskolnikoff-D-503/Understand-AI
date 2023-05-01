import {useCallback, useEffect, useState} from 'react';

type ResponseItem = {
  id: string;
  title: string;
  content: string;
};

type NewResponseItem = Omit<ResponseItem, 'id'>;

export const useSaveResponseToLocalStorage = (response: NewResponseItem) => {
  const responses = localStorage.getItem('responses');

  let items: ResponseItem[] = [];

  if (responses) {
    const parsedResponses: ResponseItem[] = JSON.parse(responses);

    items = [...parsedResponses, {...response, id: `${response.title}${parsedResponses.length}`}];
  } else {
    items = [{...response, id: `${response.title}${0}`}];
  }

  localStorage.setItem('responses', JSON.stringify(items));
};

export const useSavedResponsesFromLocalStorage = () => {
  const responses = localStorage.getItem('responses');

  let items: ResponseItem[] = [];

  useEffect(() => {
    console.log('test', responses);

    if (responses) {
      const parsedResponses: ResponseItem[] = JSON.parse(responses);
      items = [...parsedResponses];
    }
  }, [responses]);

  return {items};
};

type Value<T> = T | null;

export const useReadLocalStorage = <T>(key: string): Value<T> => {
  const readValue = localStorage.getItem(key);
  const parsedValue = readValue ? JSON.parse(readValue) : null;

  const [storedValue, setStoredValue] = useState<Value<T>>(parsedValue);

  useEffect(() => {
    setStoredValue(parsedValue);
  }, []);

  const handleStorageChange = useCallback(
    (event: StorageEvent | CustomEvent) => {
      if ((event as StorageEvent)?.key && (event as StorageEvent).key !== key) {
        return;
      }
      setStoredValue(parsedValue);
    },
    [key, parsedValue],
  );

  addEventListener('storage', handleStorageChange);

  return storedValue;
};

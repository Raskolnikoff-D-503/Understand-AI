import {useCallback, useEffect, useState} from 'react';

type Value<T> = T | null;

type ResponseItem = {
  id: string;
  title: string;
  content: string;
};

type NewResponseItem = Omit<ResponseItem, 'id'>;

export const useReadLocalStorage = <T>(key: string): Value<T> => {
  const readValue = useCallback(() => {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  }, [key]);

  const [storedValue, setStoredValue] = useState<Value<T>>(readValue);

  useEffect(() => {
    setStoredValue(readValue());
  }, []);

  const handleStorageChange = useCallback(
    (event) => {
      if ((event as StorageEvent)?.key && (event as StorageEvent).key !== key) {
        return;
      }
      setStoredValue(readValue());
    },
    [key, readValue],
  );

  useEffect(() => {
    addEventListener('local-storage', handleStorageChange);

    return () => {
      removeEventListener('local-storage', handleStorageChange);
    };
  }, [handleStorageChange]);

  return storedValue;
};

export const useSaveResponseToLocalStorage = (): [
  NewResponseItem[],
  (value: NewResponseItem) => void,
] => {
  const readValue = useCallback((): ResponseItem[] => {
    const responses = localStorage.getItem('responses');

    if (!responses) {
      return [];
    } else {
      return JSON.parse(responses);
    }
  }, []);

  const [storedValue, setStoredValue] = useState<ResponseItem[]>(readValue);

  const setResponse = useCallback(
    (value: NewResponseItem) => {
      const newValue = [...storedValue, {...value, id: `${value.title}${storedValue.length}`}];

      localStorage.setItem('responses', JSON.stringify(newValue));

      setStoredValue(newValue);

      window.dispatchEvent(new Event('local-storage'));
    },
    [storedValue],
  );

  const handleStorageChange = useCallback(() => {
    setStoredValue(readValue());
  }, [storedValue]);

  useEffect(() => {
    setStoredValue(readValue());
  }, []);

  useEffect(() => {
    addEventListener('local-storage', handleStorageChange);

    return () => {
      removeEventListener('local-storage', handleStorageChange);
    };
  }, [storedValue]);

  return [storedValue, setResponse];
};

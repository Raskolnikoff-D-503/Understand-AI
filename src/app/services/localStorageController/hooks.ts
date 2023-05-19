import {Dispatch, SetStateAction, useCallback, useEffect, useState} from 'react';

type Value<T> = T | null;
type SetValue<T> = Dispatch<SetStateAction<T>>;

export type ResponseItem = {
  id: string;
  title: string;
  content: string;
};

export type NewResponseItem = Omit<ResponseItem, 'id'>;

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

export const useSaveResponseToLocalStorage = (): ((value: NewResponseItem) => void) => {
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
      const newValue = [{...value, id: `${value.title}${storedValue.length}`}, ...storedValue];

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

  return setResponse;
};

export const useLocalStorage = <T>(key: string, initialValue: T): [T, SetValue<T>] => {
  const readValue = useCallback((): T => {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : initialValue;
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue: SetValue<T> = useCallback(
    (value) => {
      const newValue = value instanceof Function ? value(storedValue) : value;

      localStorage.setItem(key, JSON.stringify(newValue));

      setStoredValue(newValue);

      dispatchEvent(new Event('local-storage'));
    },
    [storedValue],
  );

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
  }, [storedValue]);

  return [storedValue, setValue];
};

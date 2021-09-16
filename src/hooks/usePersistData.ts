import { Dispatch, SetStateAction, useEffect, useState } from 'react';

// custom hook to get and set a value to local storage state and app state
export const usePersistData = (
  key: string,
  defaultValue: boolean[] | boolean | number
): [any, Dispatch<SetStateAction<any>>] => {
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem(key);
      return savedValue !== null ? JSON.parse(savedValue) : defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

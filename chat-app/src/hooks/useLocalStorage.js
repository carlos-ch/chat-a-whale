import { useEffect, useState } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) {
      return JSON.parse(jsonValue);
    }
    if (typeof initialValue === 'function') {
      initialValue();
    } else {
      return initialValue;
    }
  });
  useEffect(() => {
    value && localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};

export default useLocalStorage;

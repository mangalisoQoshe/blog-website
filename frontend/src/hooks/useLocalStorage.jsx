import { useState, useEffect } from "react";

const useLocalStorage = (key) => {
  const [value, setValue] = useState(() => {
    try {
      const localValue = localStorage.getItem(key);
     
      return localValue ? localValue : null;
    } catch (error) {
      console.log(error);
      return;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;

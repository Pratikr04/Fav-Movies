import { useState, useEffect } from "react";

export function useLocalStorage(initialValue,key) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue?JSON.parse(storedValue):initialValue;
  });
  useEffect(() => {
    localStorage.setItem("currentMovie", JSON.stringify(value));
  }, [value]);
  return[value,setValue]
}

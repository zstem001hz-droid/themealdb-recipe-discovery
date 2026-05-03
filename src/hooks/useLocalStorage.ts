import { useState } from "react";

// Synchronizes a piece of state with localStorage.
// Reads persisted value on first render, updates localStorage on every change.
// Returns [value, setValue] matching the useState API.
function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  // Lazy initialization reads from localStorage on first render.
  // Falls back to initialValue if nothing is stored or parsing fails.
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Updates both React state and localStorage simultaneously
  function setValue(value: T) {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.error(`Failed to save to localStorage with key "${key}"`);
    }
  }

  return [storedValue, setValue];
}

export default useLocalStorage;

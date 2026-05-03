import { useState, useEffect } from "react";

// Shape of the value returned by useFetch
interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Generic data fetching hook managing data, loading, and error states.
// Implements AbortController cleanup to prevent race conditions.
// Re-fetches automatically when the URL changes.
function useFetch<T>(url: string): UseFetchResult<T> {
  // Stores the fetched data — null until a successful response
  const [data, setData] = useState<T | null>(null);

  // Tracks whether a fetch is currently in progress
  const [loading, setLoading] = useState<boolean>(true);

  // Stores any error message if the fetch fails
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // AbortController cancels the fetch if the URL changes or component unmounts
    const controller = new AbortController();

    // Resets state before each new fetch
    setData(null);
    setError(null);
    setLoading(true);

    async function fetchData() {
      try {
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const result: T = await response.json();
        setData(result);
      } catch (err: unknown) {
        // Ignores AbortError — expected when component unmounts or URL changes
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    // Cancels any in-flight fetch when URL changes or component unmounts
    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
}

export default useFetch;

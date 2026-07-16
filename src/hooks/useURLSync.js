import { useState, useEffect } from 'react';

export const useURLSync = (paramKey = 'movie') => {
  const [value, setValue] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get(paramKey) || null;
  });

  useEffect(() => {
    const url = new URL(window.location);
    if (value) {
      url.searchParams.set(paramKey, value);
    } else {
      url.searchParams.delete(paramKey);
    }
    window.history.pushState({}, "", url);
  }, [value, paramKey]);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      setValue(params.get(paramKey) || null);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [paramKey]);

  return [value, setValue];
};

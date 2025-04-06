const promiseCache = new Map<string, Promise<unknown>>();

const getCachedPromise = <T>(
  key: string,
  fetcher: () => Promise<T>
): Promise<T> => {
  if (promiseCache.has(key)) {
    return promiseCache.get(key) as Promise<T>;
  }

  const promise = fetcher();
  promiseCache.set(key, promise);
  return promise;
};

const fetchDataAsync = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json() as T;
};

export { fetchDataAsync, getCachedPromise };

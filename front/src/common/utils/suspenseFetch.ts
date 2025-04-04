type TResourcesStatus = "pending" | "fulfilled" | "rejected";

const createResource = <T>(promise: Promise<T>) => {
  let status: TResourcesStatus = "pending";
  let result: T | null = null;
  let error: Error | null = null;

  const suspender = promise.then(
    (data) => {
      status = "fulfilled";
      result = data;
    },
    (err) => {
      status = "rejected";
      error = err;
    }
  );

  return {
    read(): T {
      if (status === "pending") {
        throw suspender;
      } else if (status === "rejected") {
        throw error;
      } else {
        return result as T;
      }
    },
  };
};

const fetchDataAsync = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
};

const fetchData = <T>(url: string, options?: RequestInit) => {
  const promise = fetchDataAsync<T>(url, options);
  return createResource<T>(promise);
};

export { fetchData };

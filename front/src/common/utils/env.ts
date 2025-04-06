const getBackendUrl = (): string => {
  const { VITE_BACKEND_URL } = import.meta.env;
  if (VITE_BACKEND_URL === undefined)
    throw new Error("backend base url not found");
  return VITE_BACKEND_URL;
};

export { getBackendUrl };

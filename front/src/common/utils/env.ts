const getBackendUrl = () => {
  const { VITE_BACKEND_URL } = import.meta.env;
  if (VITE_BACKEND_URL !== undefined) return VITE_BACKEND_URL;
};

export { getBackendUrl };

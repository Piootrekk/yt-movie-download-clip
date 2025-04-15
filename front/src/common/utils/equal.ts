const isEqual = (a: unknown, b: unknown): boolean => {
  return JSON.stringify(a) === JSON.stringify(b);
};

export { isEqual };

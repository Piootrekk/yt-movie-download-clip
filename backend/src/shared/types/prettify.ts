type TPrettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type { TPrettify };

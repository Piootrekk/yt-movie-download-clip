import { ZodType } from "zod";

const zodValidator = <T>(schema: ZodType<T>, data: unknown): T => {
  const result = schema.safeParse(data);
  if (result.success) {
    return result.data;
  } else {
    throw new Error(`ZOD: ${result.error.message}`);
  }
};

export { zodValidator };

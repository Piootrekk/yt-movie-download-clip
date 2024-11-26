import { ZodSchema, z } from "zod";

const zodValidator = <T extends ZodSchema>(
  schema: T,
  data: unknown
): z.infer<T> => {
  const result = schema.safeParse(data);
  if (result.success) {
    return result.data;
  } else throw new Error(`Validation Zod error: ${result.error.message}`);
};

export { zodValidator };

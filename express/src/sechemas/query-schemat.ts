import z from "zod";

const queryVideoSchema = z.string().url();

export { queryVideoSchema };

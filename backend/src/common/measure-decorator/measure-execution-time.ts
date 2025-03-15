import { applyDecorators } from '@nestjs/common';

const MeasureExecutionTime = () => {
  return applyDecorators(
    (_: unknown, propertyKey: string, descriptor: PropertyDescriptor) => {
      const originalMethod = descriptor.value;

      descriptor.value = async function (...args: unknown[]) {
        const start = performance.now();

        try {
          console.info(`${propertyKey} - Starting execution`);
          const result = await originalMethod.apply(this, args);
          const end = performance.now();
          const executionTime = (end - start) / 1000;
          console.info(
            `${propertyKey} - Execution completed in ${executionTime.toFixed(3)}s`,
          );

          return result;
        } catch (error) {
          const end = performance.now();
          const executionTime = (end - start) / 1000;
          console.warn(
            `${propertyKey} - Execution failed after ${executionTime.toFixed(3)}s`,
          );
          throw error;
        }
      };
      return descriptor;
    },
  );
};

export { MeasureExecutionTime };

import { performance } from 'perf_hooks';

const MeasureExecutionTime = () => {
  return function (
    _: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    const wrappedMethod = async function (...args: unknown[]) {
      const start = performance.now();
      const requestId =
        Date.now().toString(36) + Math.random().toString(36).substring(2);

      console.info(`[${requestId}] ${propertyKey} - Starting execution`);

      try {
        const result = await originalMethod.apply(this, args);
        if (result && typeof result === 'object' && 'getStream' in result) {
          const originalStream = result.getStream();
          originalStream.on('end', () => {
            const end = performance.now();
            const executionTime = (end - start) / 1000;
            console.info(
              `[${requestId}] ${propertyKey} - Stream completed in ${executionTime.toFixed(3)}s`,
            );
          });

          originalStream.on(
            'error',
            (error: unknown & { message?: string }) => {
              const end = performance.now();
              const executionTime = (end - start) / 1000;
              console.warn(
                `[${requestId}] ${propertyKey} - Stream failed after ${executionTime.toFixed(3)}s: ${error.message}`,
              );
            },
          );
        } else {
          const end = performance.now();
          const executionTime = (end - start) / 1000;
          console.info(
            `[${requestId}] ${propertyKey} - Execution completed in ${executionTime.toFixed(3)}s`,
          );
        }

        return result;
      } catch (error) {
        const end = performance.now();
        const executionTime = (end - start) / 1000;
        console.warn(
          `[${requestId}] ${propertyKey} - Execution failed after ${executionTime.toFixed(3)}s: ${error.message}`,
        );
        throw error;
      }
    };
    Object.defineProperties(
      wrappedMethod,
      Object.getOwnPropertyDescriptors(originalMethod),
    );
    const metadataKeys = Reflect.getMetadataKeys(originalMethod);
    metadataKeys.forEach((key) => {
      const metadata = Reflect.getMetadata(key, originalMethod);
      Reflect.defineMetadata(key, metadata, wrappedMethod);
    });
    descriptor.value = wrappedMethod;
    return descriptor;
  };
};

export { MeasureExecutionTime };

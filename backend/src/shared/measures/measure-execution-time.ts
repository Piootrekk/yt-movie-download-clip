import { performance } from 'perf_hooks';

type TStreamResult = {
  getStream: () => {
    on: (
      event: 'end' | 'error',
      listener: (...args: unknown[]) => void,
    ) => void;
  };
};

const hasGetStream = (obj: unknown): obj is TStreamResult => {
  return typeof obj === 'object' && obj !== null && 'getStream' in obj;
};

const MeasureExecutionTimeDecorator = () => {
  return function (
    _: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value as (
      ...args: unknown[]
    ) => Promise<unknown>;

    const wrappedMethod = async function (...args: unknown[]) {
      const start = performance.now();
      const requestId =
        Date.now().toString(36) + Math.random().toString(36).substring(2);

      console.info(`[${requestId}] ${propertyKey} - Starting execution`);

      try {
        const result = (await originalMethod.apply(
          this,
          args,
        )) as TStreamResult;

        if (result && typeof result === 'object' && 'getStream' in result) {
          if (hasGetStream(result)) {
            const originalStream = result.getStream();
            originalStream.on('end', () => {
              const end = performance.now();
              const executionTime = (end - start) / 1000;
              console.info(
                `[${requestId}] ${propertyKey} - Stream completed in ${executionTime.toFixed(3)}s`,
              );
            });

            originalStream.on('error', (error: Error) => {
              const end = performance.now();
              const executionTime = (end - start) / 1000;
              console.warn(
                `[${requestId}] ${propertyKey} - Stream failed after ${executionTime.toFixed(3)}s: ${error}`,
              );
            });
          } else {
            const end = performance.now();
            const executionTime = (end - start) / 1000;
            console.info(
              `[${requestId}] ${propertyKey} - Execution completed in ${executionTime.toFixed(3)}s`,
            );
          }

          return result;
        }
      } catch (error) {
        const err = error as unknown;
        const end = performance.now();
        const executionTime = (end - start) / 1000;
        console.warn(
          `[${requestId}] ${propertyKey} - Execution failed after ${executionTime.toFixed(3)}s: ${String(err)}`,
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
      const metadata = Reflect.getMetadata(key, originalMethod) as unknown;
      Reflect.defineMetadata(key, metadata, wrappedMethod);
    });
    descriptor.value = wrappedMethod as (
      ...args: unknown[]
    ) => Promise<(object & Record<'getStream', unknown>) | undefined>;
    return descriptor;
  };
};

export { MeasureExecutionTimeDecorator };

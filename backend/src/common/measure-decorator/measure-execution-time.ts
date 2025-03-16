const MeasureExecutionTime = () => {
  return function (
    _: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    const wrappedMethod = async function (...args: unknown[]) {
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

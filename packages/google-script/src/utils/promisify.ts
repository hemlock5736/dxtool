import { AsyncFunction } from "../types/google-script";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const promisify = <T extends (...args: any[]) => any>(
  fn: T,
): AsyncFunction<T> => {
  return (...args: Parameters<T>) => Promise.resolve(fn(...args));
};

export { promisify };

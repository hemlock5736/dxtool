import { v4 as uuidv4 } from "uuid";
import { AppWindow } from "../types/dev-server";

declare const window: AppWindow;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const proxyfy = <T extends (...args: any[]) => any>(
  functionName: [string, string],
  isCallback: boolean = false,
) => {
  return (...args: Parameters<T>) => {
    const id = uuidv4();
    const promise = new Promise((resolve: (value: ReturnType<T>) => void) => {
      window.gsStore[id] = {
        resolve: resolve as (value: unknown) => void,
        callback: isCallback ? [...args][0] : undefined,
      };
    });
    window.parent.postMessage(
      {
        type: "REQUEST_GS",
        functionName,
        args: isCallback ? [] : [...args],
        id,
      },
      "*",
    );
    return promise;
  };
};

export { proxyfy };

import { GASClient, ServerFunctions } from "gas-client";
import { FunctionMap } from "gas-client/dist/types/functions";
import { useRef } from "react";

export const useServerFunctions = (urlPattern: RegExp) => {
  const serverFunctionsRef = useRef<ServerFunctions<FunctionMap>>();

  if (serverFunctionsRef.current === undefined) {
    const { serverFunctions } = new GASClient({
      allowedDevelopmentDomains: (origin) => urlPattern.test(origin),
    });
    serverFunctionsRef.current = serverFunctions;
  }

  return serverFunctionsRef;
};

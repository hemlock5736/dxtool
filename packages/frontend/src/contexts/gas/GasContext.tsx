import { ServerFunctions } from "gas-client";
import { FunctionMap } from "gas-client/dist/types/functions";
import { createContext, FC, ReactNode } from "react";
import { GoogleScript } from "@google-apps-script/google-script/dist/types/google-script";
import { useGoogleScript } from "./hooks/useGoogleScript";
import { useServerFunctions } from "./hooks/useServerFunctions";

type Value = {
  serverFunctions: ServerFunctions<FunctionMap>;
  googleScript: GoogleScript;
};

const defaultValue: Value = {
  serverFunctions: {},
  googleScript: {} as GoogleScript,
};

export const GasContext = createContext<Value>(defaultValue);

export const GasContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const urlPattern = /https:\/\/.*\.googleusercontent\.com$/;

  const serverFunctionsRef = useServerFunctions(urlPattern);
  const googleScriptRef = useGoogleScript(urlPattern);

  const value: Value = {
    serverFunctions: serverFunctionsRef.current as ServerFunctions<FunctionMap>,
    googleScript: googleScriptRef.current as GoogleScript,
  };

  return <GasContext.Provider value={value}>{children}</GasContext.Provider>;
};

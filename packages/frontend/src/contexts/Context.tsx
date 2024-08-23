import { FC, ReactNode } from "react";
import { GasContextProvider } from "./gas/GasContext";

export const Context: FC<{ children: ReactNode }> = ({ children }) => (
  <GasContextProvider>{children}</GasContextProvider>
);

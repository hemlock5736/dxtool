import { FC, ReactNode } from "react";
import { GasContextProvider } from "./gas/GasContext";
import { SeatingContextProvider } from "./seating/SeatingContext";

export const Context: FC<{ children: ReactNode }> = ({ children }) => (
  <GasContextProvider>
    <SeatingContextProvider>{children}</SeatingContextProvider>
  </GasContextProvider>
);

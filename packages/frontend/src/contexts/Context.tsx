import { FC, ReactNode } from "react";
import { GasContextProvider } from "./gas/GasContext";
import { SeatingContextProvider } from "./seating/SeatingContext";
import { FilteredSeatIdsContextProvider } from "./filteredSeatIds/FilteredSeatIdsContext";

export const Context: FC<{ children: ReactNode }> = ({ children }) => (
  <GasContextProvider>
    <SeatingContextProvider>
      <FilteredSeatIdsContextProvider>
        {children}
      </FilteredSeatIdsContextProvider>
    </SeatingContextProvider>
  </GasContextProvider>
);

import { createContext, FC, ReactNode, useState } from "react";
import { useFilter } from "./hooks/useFilter";
import { useInitialize } from "./hooks/useInitialize";

export type State = string[];

type Value = [State, (text: string) => void];

const initialState: State = [];

const initialValue: Value = [initialState, () => {}];

export const FilteredSeatIdsContext = createContext<Value>(initialValue);

export const FilteredSeatIdsContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [filteredSeatIds, setFilteredSeatIds] = useState<State>(initialState);

  useInitialize(setFilteredSeatIds);

  const useFilterSeatIds = (text: string) => {
    useFilter(text, setFilteredSeatIds);
  };

  return (
    <FilteredSeatIdsContext.Provider
      value={[filteredSeatIds, useFilterSeatIds]}
    >
      {children}
    </FilteredSeatIdsContext.Provider>
  );
};

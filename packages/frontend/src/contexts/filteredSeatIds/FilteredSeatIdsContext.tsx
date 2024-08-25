import { createContext, Dispatch, FC, ReactNode, useReducer } from "react";
import { useInitializeFilteredSeatIds } from "./hooks/useInitializeFilteredSeatIds";
import {
  FilteredSeatIdsAction,
  filteredSeatIdsReducer,
  FilteredSeatIdsState,
  initialFilteredSeatIdsState,
} from "./reducers/filteredSeatsReducer";

type Value = [FilteredSeatIdsState, Dispatch<FilteredSeatIdsAction>];

const initialValue: Value = [initialFilteredSeatIdsState, () => {}];

export const FilteredSeatIdsContext = createContext<Value>(initialValue);

export const FilteredSeatIdsContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [filteredSeatIds, filteredSeatIdsDispatch] = useReducer(
    filteredSeatIdsReducer,
    initialFilteredSeatIdsState,
  );

  useInitializeFilteredSeatIds(filteredSeatIdsDispatch);

  return (
    <FilteredSeatIdsContext.Provider
      value={[filteredSeatIds, filteredSeatIdsDispatch]}
    >
      {children}
    </FilteredSeatIdsContext.Provider>
  );
};

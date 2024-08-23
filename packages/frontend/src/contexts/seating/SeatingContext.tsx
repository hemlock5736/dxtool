import { createContext, Dispatch, FC, ReactNode, useReducer } from "react";
import { useEmail } from "./hooks/useEmail";
import { useFilteredSeatIds } from "./hooks/useFilteredSeatIds";
import { useMembers } from "./hooks/useMembers";
import { useSeatings } from "./hooks/useSeatings";
import {
  initialSeatingBy,
  SeatingsBy,
  useSeatingsBy,
} from "./hooks/useSeatingsBy";
import { useSeats } from "./hooks/useSeats";
import {
  SeatingAction,
  seatingReducer,
  SeatingState,
} from "./reducers/seatingReducer";

type Value = {
  seatingState: SeatingState;
  seatings: SeatingsBy;
  seatingDispatch: Dispatch<SeatingAction>;
};

const initialState: SeatingState = {
  members: {},
  seats: {},
  seatings: new Set(),
  email: "",
  filteredSeatIds: new Set(),
};

const defaultValue: Value = {
  seatingState: initialState,
  seatings: initialSeatingBy,
  seatingDispatch: () => {},
};

export const SeatingContext = createContext<Value>(defaultValue);

export const SeatingContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [seatingState, seatingDispatch] = useReducer(
    seatingReducer,
    initialState,
  );

  useMembers(seatingDispatch);
  useSeats(seatingDispatch);
  useSeatings(seatingDispatch);
  useEmail(seatingDispatch);
  useFilteredSeatIds(seatingDispatch, seatingState.seats);

  const value = {
    seatingState,
    seatings: useSeatingsBy(seatingState.seatings),
    seatingDispatch,
  };

  return (
    <SeatingContext.Provider value={value}>{children}</SeatingContext.Provider>
  );
};

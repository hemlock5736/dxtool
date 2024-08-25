import { createContext, Dispatch, FC, ReactNode, useReducer } from "react";
import { useEmail } from "./hooks/useEmail";
import { useFilteredSeatIds } from "./hooks/useFilteredSeatIds";
import { useMembers } from "./hooks/useMembers";
import { useSeatings } from "./hooks/useSeatings";
import {
  initialMemberSeatsBy,
  MemberSeatsBy,
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
  memberSeatsBy: MemberSeatsBy;
  seatingDispatch: Dispatch<SeatingAction>;
};

const initialState: SeatingState = {
  members: {},
  seats: {},
  memberSeats: [],
  email: "",
  filteredSeatIds: [],
};

const defaultValue: Value = {
  seatingState: initialState,
  memberSeatsBy: initialMemberSeatsBy,
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

  const value: Value = {
    seatingState,
    memberSeatsBy: useSeatingsBy(seatingState.memberSeats),
    seatingDispatch,
  };

  return (
    <SeatingContext.Provider value={value}>{children}</SeatingContext.Provider>
  );
};

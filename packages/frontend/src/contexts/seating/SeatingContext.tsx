import { createContext, Dispatch, FC, ReactNode, useReducer } from "react";
import { useEmail } from "./hooks/useEmail";
import { useMembers } from "./hooks/useMembers";
import { useMemberSeats } from "./hooks/useMemberSeats";
import {
  initialMemberSeatsBy,
  MemberSeatsBy,
  useMemberSeatsBy,
} from "./hooks/useMemberSeatsBy";
import { useSeats } from "./hooks/useSeats";
import {
  SeatingAction,
  seatingReducer,
  SeatingState,
  initialSeatingState,
} from "./reducers/seatingReducer";
import { useFilteredSeatIds } from "./hooks/useFilteredSeatIds";

type Value = {
  seatingState: SeatingState;
  memberSeatsBy: MemberSeatsBy;
  seatingDispatch: Dispatch<SeatingAction>;
};

const defaultValue: Value = {
  seatingState: initialSeatingState,
  memberSeatsBy: initialMemberSeatsBy,
  seatingDispatch: () => {},
};

export const SeatingContext = createContext<Value>(defaultValue);

export const SeatingContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [seatingState, seatingDispatch] = useReducer(
    seatingReducer,
    initialSeatingState,
  );

  useMembers(seatingDispatch);
  useSeats(seatingDispatch);
  useMemberSeats(seatingDispatch);
  useEmail(seatingDispatch);

  useFilteredSeatIds(seatingDispatch, seatingState.loaded.seats);

  const value: Value = {
    seatingState,
    memberSeatsBy: useMemberSeatsBy(seatingState.memberSeats),
    seatingDispatch,
  };

  return (
    <SeatingContext.Provider value={value}>{children}</SeatingContext.Provider>
  );
};

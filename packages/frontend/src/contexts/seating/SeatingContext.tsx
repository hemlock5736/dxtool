import { createContext, Dispatch, FC, ReactNode, useReducer } from "react";
import { useEmail } from "./hooks/useEmail";
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
  initialSeatingState,
} from "./reducers/seatingReducer";

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
  useSeatings(seatingDispatch);
  useEmail(seatingDispatch);

  const value: Value = {
    seatingState,
    memberSeatsBy: useSeatingsBy(seatingState.memberSeats),
    seatingDispatch,
  };

  return (
    <SeatingContext.Provider value={value}>{children}</SeatingContext.Provider>
  );
};

import { useMemo } from "react";
import { MemberSeats } from "@google-apps-script/shared/types/MemberSeat";
import { fromManyToMany, Result } from "../../../utils/fromManyToMany";

export type MemberSeatsBy = {
  seatId: Result;
  email: Result;
};

export const initialMemberSeatsBy: MemberSeatsBy = {
  seatId: {},
  email: {},
};

export const useMemberSeatsBy = (memberSeats: MemberSeats): MemberSeatsBy => {
  const seatingsBySeatId = useMemo(
    () => fromManyToMany(memberSeats, "seatId", "email"),
    [memberSeats],
  );

  const seatingsByEmail = useMemo(
    () => fromManyToMany(memberSeats, "email", "seatId"),
    [memberSeats],
  );

  return { seatId: seatingsBySeatId, email: seatingsByEmail };
};

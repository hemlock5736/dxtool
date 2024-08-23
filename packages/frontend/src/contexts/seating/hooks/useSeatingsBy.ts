import { useMemo } from "react";
import { Seatings } from "../../../types/Seating";
import { fromManyToMany, Result } from "../../../utils/fromManyToMany";

export type SeatingsBy = {
  bySeatId: Result;
  byEmail: Result;
};

export const initialSeatingBy: SeatingsBy = {
  bySeatId: {},
  byEmail: {},
};

export const useSeatingsBy = (seatings: Seatings): SeatingsBy => {
  const seatingsBySeatId = useMemo(
    () => fromManyToMany(seatings, "seatId", "email"),
    [seatings],
  );

  const seatingsByEmail = useMemo(
    () => fromManyToMany(seatings, "email", "seatId"),
    [seatings],
  );

  return { bySeatId: seatingsBySeatId, byEmail: seatingsByEmail };
};

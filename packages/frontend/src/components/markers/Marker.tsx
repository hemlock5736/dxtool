import { FC, ReactNode, useContext } from "react";
import { SeatingContext } from "../../contexts/seating/SeatingContext";
import { Seat } from "@google-apps-script/shared/types/Seat";
import { OccupiedSeatMarker } from "./OccupiedSeatMarker";
import { VacantSeatMarker } from "./VacantSeatMarker";

type MarkerProps = {
  seat: Seat;
  children: ReactNode;
};

export const Marker: FC<MarkerProps> = ({ seat, children }) => {
  const { memberSeatsBy } = useContext(SeatingContext);

  return memberSeatsBy.seatId[seat.id] ? (
    <OccupiedSeatMarker seat={seat}>{children}</OccupiedSeatMarker>
  ) : (
    <VacantSeatMarker seat={seat}>{children}</VacantSeatMarker>
  );
};

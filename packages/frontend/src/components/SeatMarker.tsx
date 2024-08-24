import { FC, useContext } from "react";
import { SeatingContext } from "../contexts/seating/SeatingContext";
import { Seat } from "@google-apps-script/shared/types/Seat";
import { ConferencePopup } from "./ConferencePopup";
import { OccupiedSeatMarker } from "./OccupiedSeatMarker";
import { OfficePopup } from "./OfficePopup";
import { VacantSeatMarker } from "./VacantSeatMarker";

type SeatMarkerProps = {
  seat: Seat;
};

export const SeatMarker: FC<SeatMarkerProps> = ({ seat }) => {
  const { seatingState, memberSeatsBy } = useContext(SeatingContext);

  if (!seatingState.filteredSeatIds.includes(seat.id)) {
    return;
  }

  const Popup =
    seat.category === "conference" ? (
      <ConferencePopup seat={seat} />
    ) : (
      <OfficePopup seat={seat} />
    );

  return memberSeatsBy.seatId[seat.id] ? (
    <OccupiedSeatMarker seat={seat}>{Popup}</OccupiedSeatMarker>
  ) : (
    <VacantSeatMarker seat={seat}>{Popup}</VacantSeatMarker>
  );
};

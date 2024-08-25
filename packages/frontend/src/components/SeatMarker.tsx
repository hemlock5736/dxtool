import { FC, useContext } from "react";
import { SeatingContext } from "../contexts/seating/SeatingContext";
import { Seat } from "@google-apps-script/shared/types/Seat";
import { ConferencePopup } from "./popups/ConferencePopup";
import { OccupiedSeatMarker } from "./markers/OccupiedSeatMarker";
import { OfficePopup } from "./popups/OfficePopup";
import { VacantSeatMarker } from "./markers/VacantSeatMarker";

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

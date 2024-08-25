import { FC, useContext } from "react";
import { SeatingContext } from "../contexts/seating/SeatingContext";
import { Seat } from "@google-apps-script/shared/types/Seat";
import { Popup } from "./popups/Popup";
import { Marker } from "./markers/Marker";

type SeatMarkerProps = {
  seat: Seat;
};

export const SeatMarker: FC<SeatMarkerProps> = ({ seat }) => {
  const { seatingState } = useContext(SeatingContext);

  if (!seatingState.filteredSeatIds.includes(seat.id)) {
    return;
  }

  return (
    <Marker seat={seat}>
      <Popup seat={seat} />
    </Marker>
  );
};

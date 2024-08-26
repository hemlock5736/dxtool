import { FC, useContext } from "react";
import { Seat } from "@google-apps-script/shared/types/Seat";
import { Popup } from "./popups/Popup";
import { Marker } from "./markers/Marker";
import { SeatingContext } from "../contexts/seating/SeatingContext";

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

import { FC, useContext } from "react";
import { Seat } from "@google-apps-script/shared/types/Seat";
import { Popup } from "./popups/Popup";
import { Marker } from "./markers/Marker";
import { FilteredSeatIdsContext } from "../contexts/filteredSeatIds/FilteredSeatIdsContext";

type SeatMarkerProps = {
  seat: Seat;
};

export const SeatMarker: FC<SeatMarkerProps> = ({ seat }) => {
  const [filteredSeatIds] = useContext(FilteredSeatIdsContext);

  if (!filteredSeatIds.includes(seat.id)) {
    return;
  }

  return (
    <Marker seat={seat}>
      <Popup seat={seat} />
    </Marker>
  );
};

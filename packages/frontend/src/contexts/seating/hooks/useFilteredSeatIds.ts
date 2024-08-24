import { Dispatch, useEffect } from "react";
import { Seats } from "@google-apps-script/shared/types/Seat";
import { SeatingAction } from "../reducers/seatingReducer";

export const useFilteredSeatIds = (
  dispatch: Dispatch<SeatingAction>,
  seats: Seats,
) => {
  useEffect(() => {
    dispatch({
      type: "set",
      key: "filteredSeatIds",
      value: Object.values(seats).map((seat) => seat.id),
    });
  }, [dispatch, seats]);
};

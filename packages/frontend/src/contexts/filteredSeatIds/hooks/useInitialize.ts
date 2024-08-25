import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { SeatingContext } from "../../seating/SeatingContext";
import { State } from "../FilteredSeatIdsContext";

export const useInitialize = (
  setFilteredSeatIds: Dispatch<SetStateAction<State>>,
) => {
  const { seatingState } = useContext(SeatingContext);
  useEffect(() => {
    const seatIds = Object.values(seatingState.seats).map((seat) => seat.id);
    setFilteredSeatIds(seatIds);
  }, [setFilteredSeatIds, seatingState.seats]);
};

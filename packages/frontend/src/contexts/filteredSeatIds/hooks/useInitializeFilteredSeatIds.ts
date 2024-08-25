import { Dispatch, useContext, useEffect, useRef } from "react";
import { SeatingContext } from "../../seating/SeatingContext";
import { FilteredSeatIdsAction } from "../reducers/filteredSeatsReducer";

export const useInitializeFilteredSeatIds = (
  filteredSeatIdsDispatch: Dispatch<FilteredSeatIdsAction>,
) => {
  const { seatingState } = useContext(SeatingContext);
  const ref = useRef<boolean>(false);

  useEffect(() => {
    if (
      ref.current ||
      !Object.values(seatingState.loaded).every((value) => value)
    ) {
      return;
    }
    ref.current = true;
    filteredSeatIdsDispatch({
      type: "filter",
      text: "",
      seats: seatingState.seats,
      members: seatingState.members,
      memberSeats: seatingState.memberSeats,
    });
  }, [filteredSeatIdsDispatch, seatingState]);
};

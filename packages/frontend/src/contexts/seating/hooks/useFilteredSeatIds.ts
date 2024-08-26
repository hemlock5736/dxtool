import { Dispatch, useEffect, useRef } from "react";
import { SeatingAction } from "../reducers/seatingReducer";

export const useFilteredSeatIds = (
  dispatch: Dispatch<SeatingAction>,
  seatsLoaded: boolean,
) => {
  const filteredSeatIdsRef = useRef<boolean>(false);
  useEffect(() => {
    if (!seatsLoaded || filteredSeatIdsRef.current) {
      return;
    }
    filteredSeatIdsRef.current = true;
    dispatch({
      type: "filter",
      text: "",
    });
  }, [dispatch, seatsLoaded]);
};

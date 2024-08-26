import { Dispatch, useEffect } from "react";
import { SeatingAction } from "../reducers/seatingReducer";

export const useFilteredSeatIds = (
  dispatch: Dispatch<SeatingAction>,
  seatsLoaded: boolean,
) => {
  useEffect(() => {
    if (!seatsLoaded) return;
    dispatch({
      type: "filter",
      text: "",
    });
  }, [dispatch, seatsLoaded]);
};

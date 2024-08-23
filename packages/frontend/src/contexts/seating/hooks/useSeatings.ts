import { Dispatch, useContext, useEffect } from "react";
import { Seatings } from "../../../types/Seating";
import { SeatingAction } from "../reducers/seatingReducer";
import { GasContext } from "../../gas/GasContext";

export const useSeatings = (dispatch: Dispatch<SeatingAction>) => {
  const { serverFunctions } = useContext(GasContext);

  useEffect(() => {
    serverFunctions
      .getMemberSeats()
      .then((memberSeats) => {
        dispatch({
          type: "set",
          key: "seatings",
          value: new Set(memberSeats) as Seatings,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [serverFunctions, dispatch]);
};

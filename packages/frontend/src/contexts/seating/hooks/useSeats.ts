import { Dispatch, useContext, useEffect } from "react";
import { Seats } from "@google-apps-script/shared/types/Seat";
import { SeatingAction } from "../reducers/seatingReducer";
import { GasContext } from "../../gas/GasContext";

export const useSeats = (dispatch: Dispatch<SeatingAction>) => {
  const { serverFunctions } = useContext(GasContext);

  useEffect(() => {
    serverFunctions
      .getSeats()
      .then((seats: Seats) => {
        dispatch({ type: "set", key: "seats", value: seats });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [serverFunctions, dispatch]);
};

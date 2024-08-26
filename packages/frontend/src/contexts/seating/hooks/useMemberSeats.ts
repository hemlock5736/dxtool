import { Dispatch, useContext, useEffect } from "react";
import { MemberSeats } from "@google-apps-script/shared/types/MemberSeat";
import { SeatingAction } from "../reducers/seatingReducer";
import { GasContext } from "../../gas/GasContext";

export const useMemberSeats = (dispatch: Dispatch<SeatingAction>) => {
  const { serverFunctions } = useContext(GasContext);

  useEffect(() => {
    serverFunctions
      .getMemberSeats()
      .then((memberSeats: MemberSeats) => {
        dispatch({
          type: "set",
          key: "memberSeats",
          value: memberSeats,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [serverFunctions, dispatch]);
};

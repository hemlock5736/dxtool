import { useContext, useEffect, useRef } from "react";
import { GasContext } from "../contexts/gas/GasContext";
import { SeatingContext } from "../contexts/seating/SeatingContext";

export const useLogin = () => {
  const { serverFunctions, googleScript } = useContext(GasContext);
  const { seatingState, memberSeatsBy, seatingDispatch } =
    useContext(SeatingContext);
  const ref = useRef<boolean>(false);

  useEffect(() => {
    if (
      ref.current ||
      !Object.values(seatingState.loaded).every((value) => value)
    ) {
      return;
    }
    ref.current = true;
    googleScript.url.getLocation((location) => {
      const seatId = location.parameter?.seat_id as string | undefined;
      if (typeof seatId === "undefined") return;
      const email = seatingState.email;
      if (memberSeatsBy.seatId[seatId].includes(email)) {
        serverFunctions.leaveSeat(seatId).catch(() => {
          seatingDispatch({ type: "sitDown", email, seatId });
        });
        seatingDispatch({ type: "leaveSeat", email, seatId });
      } else {
        serverFunctions.sitDown(seatId).catch(() => {
          seatingDispatch({ type: "leaveSeat", email, seatId });
        });
        seatingDispatch({ type: "sitDown", email, seatId });
      }
      googleScript.history.replace(null, {});
    });
  }, [
    serverFunctions,
    googleScript,
    seatingState,
    memberSeatsBy,
    seatingDispatch,
  ]);
};

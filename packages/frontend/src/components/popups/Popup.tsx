import { Seat } from "@google-apps-script/shared/types/Seat";
import { FC, useContext } from "react";
import { ConferencePopup } from "./ConferencePopup";
import { OfficePopup } from "./OfficePopup";
import { SeatingContext } from "../../contexts/seating/SeatingContext";
import { GasContext } from "../../contexts/gas/GasContext";

export type BasePopupProps = {
  seat: Seat;
  makeHandleLeaveSeat: (email: string) => () => void;
  makeHandleSitDown: (email: string) => () => void;
};

export const Popup: FC<{ seat: Seat }> = ({ seat }) => {
  const { serverFunctions } = useContext(GasContext);
  const { seatingDispatch } = useContext(SeatingContext);

  const makeHandleLeaveSeat = (email: string) => () => {
    serverFunctions.leaveSeat(seat.id).catch(() => {
      seatingDispatch({ type: "sitDown", email, seatId: seat.id });
    });
    seatingDispatch({ type: "leaveSeat", email, seatId: seat.id });
  };

  const makeHandleSitDown = (email: string) => () => {
    serverFunctions.sitDown(seat.id).catch(() => {
      seatingDispatch({ type: "leaveSeat", email, seatId: seat.id });
    });
    seatingDispatch({ type: "sitDown", email, seatId: seat.id });
  };

  const props: BasePopupProps = {
    seat,
    makeHandleLeaveSeat,
    makeHandleSitDown,
  };

  return seat.category === "conference" ? (
    <ConferencePopup {...props} />
  ) : (
    <OfficePopup {...props} />
  );
};

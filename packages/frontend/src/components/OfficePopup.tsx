import { FC, useContext } from "react";
import { Popup } from "react-leaflet";
import { SeatingContext } from "../contexts/seating/SeatingContext";
import { Seat } from "@google-apps-script/shared/types/Seat";
import { GasContext } from "../contexts/gas/GasContext";

type OfficePopupProps = {
  seat: Seat;
};

export const OfficePopup: FC<OfficePopupProps> = ({ seat }) => {
  const { serverFunctions } = useContext(GasContext);
  const { seatingState, memberSeatsBy, seatingDispatch } =
    useContext(SeatingContext);
  const members = seatingState.members;
  const email = seatingState.email;

  const emails = memberSeatsBy.seatId[seat.id];
  const member = emails ? members[[...emails][0]] : undefined;

  const handleStandup = () => {
    serverFunctions.leaveSeat(seat.id).then(() => {
      seatingDispatch({ type: "leaveSeat", email, seatId: seat.id });
    });
  };

  const handleSitdown = () => {
    serverFunctions.sitDown(seat.id).then(() => {
      seatingDispatch({ type: "sitDown", email, seatId: seat.id });
    });
  };

  return (
    <Popup>
      {member ? (
        <>
          <p>{seat.id}</p>
          <p>{member.name}</p>
          <p>{member.department}</p>
          <p>{member.position}</p>
          {emails.includes(email) ? (
            <button onClick={handleStandup}>standUp</button>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <p>{seat.id}</p>
          <p>vacant</p>
          <button onClick={handleSitdown}>sitDown</button>
        </>
      )}
    </Popup>
  );
};

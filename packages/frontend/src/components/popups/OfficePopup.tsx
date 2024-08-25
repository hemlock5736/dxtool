import { FC, useContext } from "react";
import { Popup } from "react-leaflet";
import { SeatingContext } from "../../contexts/seating/SeatingContext";
import { BasePopupProps } from "./Popup";

export const OfficePopup: FC<BasePopupProps> = ({
  seat,
  makeHandleLeaveSeat,
  makeHandleSitDown,
}) => {
  const { seatingState, memberSeatsBy } = useContext(SeatingContext);
  const members = seatingState.members;
  const email = seatingState.email;

  const emails = memberSeatsBy.seatId[seat.id];
  const member = emails ? members[[...emails][0]] : undefined;

  return (
    <Popup>
      {member ? (
        <>
          <p>{seat.id}</p>
          <p>{member.name}</p>
          <p>{member.department}</p>
          <p>{member.position}</p>
          {emails.includes(email) ? (
            <button onClick={makeHandleLeaveSeat(email)}>standUp</button>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <p>{seat.id}</p>
          <p>vacant</p>
          <button onClick={makeHandleSitDown(email)}>sitDown</button>
        </>
      )}
    </Popup>
  );
};

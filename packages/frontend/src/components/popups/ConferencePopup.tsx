import { FC, useContext } from "react";
import { Popup } from "react-leaflet";
import { SeatingContext } from "../../contexts/seating/SeatingContext";
import { BasePopupProps } from "./Popup";

export const ConferencePopup: FC<BasePopupProps> = ({
  seat,
  makeHandleLeaveSeat,
  makeHandleSitDown,
}) => {
  const { seatingState, memberSeatsBy } = useContext(SeatingContext);
  const members = seatingState.members;
  const email = seatingState.email;

  return (
    <Popup>
      <p>{seat.id}</p>
      <div>
        {memberSeatsBy.seatId[seat.id]?.map((email) => {
          const member = members[email];
          return (
            <div key={email}>
              <p>{member?.name}</p>
            </div>
          );
        })}
        {memberSeatsBy.seatId[seat.id]?.includes(email) ? (
          <button onClick={makeHandleLeaveSeat(email)}>standup</button>
        ) : (
          <button onClick={makeHandleSitDown(email)}>sitdown</button>
        )}
      </div>
    </Popup>
  );
};

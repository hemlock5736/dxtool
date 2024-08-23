import { FC, useContext } from "react";
import { Popup } from "react-leaflet";
import { SeatingContext } from "../contexts/seating/SeatingContext";
import { Seat } from "../types/Seat";

type ConferencePopupProps = {
  seat: Seat;
};

export const ConferencePopup: FC<ConferencePopupProps> = ({ seat }) => {
  const { seatingState, seatings, seatingDispatch } =
    useContext(SeatingContext);
  const members = seatingState.members;
  const email = seatingState.email;

  const handleStandup = () => {
    seatingDispatch({ type: "standup", email, seatId: seat.id });
  };

  const handleSitdown = () => {
    seatingDispatch({ type: "sitdown", email, seatId: seat.id });
  };

  return (
    <Popup>
      <p>{seat.id}</p>
      <div>
        {[...(seatings.bySeatId[seat.id] ?? [])].map((email) => {
          const member = members[email];
          return (
            <div key={email}>
              <p>{member?.name}</p>
            </div>
          );
        })}
        {seatings.bySeatId[seat.id]?.has(email) ? (
          <button onClick={handleStandup}>standup</button>
        ) : (
          <button onClick={handleSitdown}>sitdown</button>
        )}
      </div>
    </Popup>
  );
};

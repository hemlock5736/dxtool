import { FC, useContext } from "react";
import { Popup } from "react-leaflet";
import { SeatingContext } from "../../contexts/seating/SeatingContext";
import { Seat } from "@google-apps-script/shared/types/Seat";
import { GasContext } from "../../contexts/gas/GasContext";

type ConferencePopupProps = {
  seat: Seat;
};

export const ConferencePopup: FC<ConferencePopupProps> = ({ seat }) => {
  const { serverFunctions } = useContext(GasContext);
  const { seatingState, memberSeatsBy, seatingDispatch } =
    useContext(SeatingContext);
  const members = seatingState.members;
  const email = seatingState.email;

  const handleLeaveSeat = () => {
    serverFunctions.leaveSeat(seat.id).catch(() => {
      seatingDispatch({ type: "sitDown", email, seatId: seat.id });
    });
    seatingDispatch({ type: "leaveSeat", email, seatId: seat.id });
  };

  const handleSitdown = () => {
    serverFunctions.sitDown(seat.id).catch(() => {
      seatingDispatch({ type: "leaveSeat", email, seatId: seat.id });
    });
    seatingDispatch({ type: "sitDown", email, seatId: seat.id });
  };

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
          <button onClick={handleLeaveSeat}>standup</button>
        ) : (
          <button onClick={handleSitdown}>sitdown</button>
        )}
      </div>
    </Popup>
  );
};

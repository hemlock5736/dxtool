import { Dispatch, SetStateAction, useContext } from "react";
import { State } from "../FilteredSeatIdsContext";
import { SeatingContext } from "../../seating/SeatingContext";
import { match } from "../../../utils/match";
import { category } from "../../../constants/category";

export const useFilter = (
  text: string,
  setFilteredSeatIds: Dispatch<SetStateAction<State>>,
) => {
  const { seatingState } = useContext(SeatingContext);

  if (text === "") {
    setFilteredSeatIds(
      Object.values(seatingState.seats).map((seat) => seat.id),
    );
    return;
  }

  const seatdIds = Object.values(seatingState.seats)
    .filter(
      (seat) => match(text, seat.id) || match(text, category[seat.category]),
    )
    .map((seat) => seat.id);
  const emails = Object.values(seatingState.members)
    .filter(
      (member) =>
        match(text, member.name) ||
        match(text, member.nameKana) ||
        match(text, member.department) ||
        match(text, member.position),
    )
    .map((member) => member.email);
  const seatIdsFromEmails = seatingState.memberSeats
    .filter((memberSeat) => emails.includes(memberSeat.email))
    .map((memberSeat) => memberSeat.seatId);
  const filteredSeatIds = [...new Set([...seatdIds, ...seatIdsFromEmails])];
  setFilteredSeatIds(filteredSeatIds);
};

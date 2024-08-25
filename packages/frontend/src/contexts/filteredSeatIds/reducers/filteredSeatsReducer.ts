import { Members } from "@google-apps-script/shared/types/Member";
import { Seats } from "@google-apps-script/shared/types/Seat";
import { MemberSeats } from "@google-apps-script/shared/types/MemberSeat";
import { match } from "../../../utils/match";
import { category } from "../../../constants/category";

export type FilteredSeatIdsState = string[];

export const initialFilteredSeatIdsState: FilteredSeatIdsState = [];

export type FilteredSeatIdsAction = {
  type: "filter";
  text: string;
  seats: Seats;
  members: Members;
  memberSeats: MemberSeats;
};

export const filteredSeatIdsReducer = (
  _state: FilteredSeatIdsState,
  action: FilteredSeatIdsAction,
): FilteredSeatIdsState => {
  switch (action.type) {
    case "filter": {
      if (action.text === "") {
        return Object.values(action.seats).map((seat) => seat.id);
      }

      const seatdIds = Object.values(action.seats)
        .filter(
          (seat) =>
            match(action.text, seat.id) ||
            match(action.text, category[seat.category]),
        )
        .map((seat) => seat.id);
      const emails = Object.values(action.members)
        .filter(
          (member) =>
            match(action.text, member.name) ||
            match(action.text, member.nameKana) ||
            match(action.text, member.department) ||
            match(action.text, member.position),
        )
        .map((member) => member.email);
      const seatIdsFromEmails = action.memberSeats
        .filter((memberSeat) => emails.includes(memberSeat.email))
        .map((memberSeat) => memberSeat.seatId);
      const filteredSeatIds = [...new Set([...seatdIds, ...seatIdsFromEmails])];
      return filteredSeatIds;
    }
  }
};

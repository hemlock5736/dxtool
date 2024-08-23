import { category } from "../../../constants/category";
import { Members } from "../../../types/Member";
import { Seat, Seats } from "../../../types/Seat";
import { Seating, Seatings } from "../../../types/Seating";

export type SeatingState = {
  members: Members;
  seats: Seats;
  seatings: Seatings;
  email: string;
  filteredSeatIds: Set<string>;
};

export type SeatingAction =
  | {
      type: "set";
      key: keyof SeatingState;
      value: SeatingState[keyof SeatingState];
    }
  | { type: "sitdown"; email: string; seatId: string }
  | { type: "standup"; email: string; seatId: string }
  | { type: "filter"; text: string };

export const seatingReducer = (
  state: SeatingState,
  action: SeatingAction,
): SeatingState => {
  switch (action.type) {
    case "set": {
      return {
        ...state,
        [action.key]: action.value,
      };
    }
    case "standup": {
      const seatings = new Set(
        [...(state.seatings ?? [])].filter(
          (seating) =>
            seating.email === action.email && seating.seatId === action.seatId,
        ),
      );
      return {
        ...state,
        seatings: state.seatings.difference(seatings),
      };
    }
    case "sitdown": {
      const seating: Seating = { email: action.email, seatId: action.seatId };
      const isConference = (seat: Seat) => seat.category === "conference";
      const isConferenceRoom = isConference(state.seats[action.seatId]);
      const seatings = new Set(
        [...(state.seatings ?? [])].filter(
          (seating) => seating.email === action.email,
        ),
      );
      const conferences = new Set(
        [...(seatings ?? [])].filter((seating) =>
          isConference(state.seats[seating.seatId]),
        ),
      );
      const offices = seatings.difference(conferences);
      return {
        ...state,
        seatings: state.seatings
          .difference(isConferenceRoom ? conferences : offices)
          .add(seating),
      };
    }
    case "filter": {
      const text = action.text;
      if (text === "") {
        return {
          ...state,
          filteredSeatIds: new Set(
            Object.values(state.seats).map((seat) => seat.id),
          ),
        };
      }
      const seatdIds = new Set(
        Object.values(state.seats)
          .filter(
            (seat) =>
              match(text, seat.id) || match(text, category[seat.category]),
          )
          .map((seat) => seat.id),
      );
      const emails = new Set(
        Object.values(state.members)
          .filter(
            (member) =>
              match(text, member.name) ||
              match(text, member.nameKana) ||
              match(text, member.department) ||
              match(text, member.position),
          )
          .map((member) => member.email),
      );
      const seatIdsFromEmails = new Set(
        [...(state.seatings ?? [])]
          .filter((seating) => emails.has(seating.email))
          .map((seating) => seating.seatId),
      );
      return { ...state, filteredSeatIds: seatdIds.union(seatIdsFromEmails) };
    }
  }
};

function match(item: string, criteria: string) {
  return criteria.toLowerCase().includes(item.toLowerCase());
}

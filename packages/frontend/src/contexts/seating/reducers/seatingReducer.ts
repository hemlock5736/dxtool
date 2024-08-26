import { category } from "../../../constants/category";
import { Members } from "@google-apps-script/shared/types/Member";
import { Seat, Seats } from "@google-apps-script/shared/types/Seat";
import {
  MemberSeat,
  MemberSeats,
} from "@google-apps-script/shared/types/MemberSeat";
import { match } from "../../../utils/match";

export type CoreSeatingState = {
  members: Members;
  seats: Seats;
  memberSeats: MemberSeats;
  email: string;
};

export type SeatingState = CoreSeatingState & {
  loaded: { [key in keyof CoreSeatingState]: boolean };
  filteredSeatIds: string[];
};

export const initialSeatingState: SeatingState = {
  members: {},
  seats: {},
  memberSeats: [],
  email: "",
  loaded: {
    members: false,
    seats: false,
    memberSeats: false,
    email: false,
  },
  filteredSeatIds: [],
};

export type SeatingAction =
  | {
      type: "set";
      key: keyof CoreSeatingState;
      value: CoreSeatingState[keyof CoreSeatingState];
    }
  | { type: "sitDown"; email: string; seatId: string }
  | { type: "leaveSeat"; email: string; seatId: string }
  | { type: "filter"; text: string };

export const seatingReducer = (
  state: SeatingState,
  action: SeatingAction,
): SeatingState => {
  switch (action.type) {
    case "set": {
      state.loaded[action.key] = true;
      return {
        ...state,
        [action.key]: action.value,
      };
    }
    case "leaveSeat": {
      const memberSeats = state.memberSeats.filter(
        (memberSeat) =>
          !(
            memberSeat.email === action.email &&
            memberSeat.seatId === action.seatId
          ),
      );
      return {
        ...state,
        memberSeats,
      };
    }
    case "sitDown": {
      const CheckIfConferenceRoom = (seat: Seat) =>
        seat.category === "conference";
      const isConferenceRoom = CheckIfConferenceRoom(
        state.seats[action.seatId],
      );
      const memberSeats = state.memberSeats.filter((memberSeat) => {
        const seat = state.seats[memberSeat.seatId];
        return !(
          memberSeat.email === action.email &&
          (isConferenceRoom
            ? CheckIfConferenceRoom(seat)
            : !CheckIfConferenceRoom(seat))
        );
      });
      const memberSeat: MemberSeat = {
        email: action.email,
        seatId: action.seatId,
      };
      return {
        ...state,
        memberSeats: [...memberSeats, memberSeat],
      };
    }
    case "filter": {
      const text = action.text;
      if (text === "") {
        return {
          ...state,
          filteredSeatIds: Object.values(state.seats).map((seat) => seat.id),
        };
      }
      const seatdIds = Object.values(state.seats)
        .filter(
          (seat) =>
            match(text, seat.id) || match(text, category[seat.category]),
        )
        .map((seat) => seat.id);
      const emails = Object.values(state.members)
        .filter(
          (member) =>
            match(text, member.name) ||
            match(text, member.nameKana) ||
            match(text, member.department) ||
            match(text, member.position),
        )
        .map((member) => member.email);
      const seatIdsFromEmails = state.memberSeats
        .filter((memberSeat) => emails.includes(memberSeat.email))
        .map((memberSeat) => memberSeat.seatId);
      const filteredSeatIds = [...new Set([...seatdIds, ...seatIdsFromEmails])];
      return { ...state, filteredSeatIds };
    }
  }
};

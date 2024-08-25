import { Members } from "@google-apps-script/shared/types/Member";
import { Seat, Seats } from "@google-apps-script/shared/types/Seat";
import {
  MemberSeat,
  MemberSeats,
} from "@google-apps-script/shared/types/MemberSeat";

export type CoreSeatingState = {
  members: Members;
  seats: Seats;
  memberSeats: MemberSeats;
  email: string;
};

export type SeatingState = CoreSeatingState & {
  loaded: { [key in keyof CoreSeatingState]: boolean };
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
};

export type SeatingAction =
  | {
      type: "set";
      key: keyof CoreSeatingState;
      value: CoreSeatingState[keyof CoreSeatingState];
    }
  | { type: "sitDown"; email: string; seatId: string }
  | { type: "leaveSeat"; email: string; seatId: string };

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
  }
};

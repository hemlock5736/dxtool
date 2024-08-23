import { MemberSeat } from "../types/MemberSeat";
import { Seat } from "../types/Seat";
import { getMemberSeatRecords } from "../utils/getMemberSeatRecords";
import { makeRowContents } from "../utils/makeRowContents";
import { getEmail } from "./getEmail";
import { getSeats } from "./getSeats";

export function sitDown(seatId: string) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const memberSeatsSheet = ss.getSheetByName("memberSeats");
  if (!memberSeatsSheet) return;

  const email = getEmail();
  const seats = getSeats();
  const [memberSeatRecords, columnNames] = getMemberSeatRecords();

  const memberSeat: MemberSeat = { email, seatId };
  const isConference = (seat: Seat) => seat.category === "conference";
  const isConferenceRoom = isConference(seats[seatId]);
  memberSeatRecords
    .map((memberSeatRecord, i) => ({
      index: i,
      record: memberSeatRecord,
    }))
    .filter(
      (memberSeatRecordWithIndex) =>
        memberSeatRecordWithIndex.record.email === email,
    )
    .filter((memberSeatRecordWithIndex) => {
      const seat = seats[memberSeatRecordWithIndex.record.seatId];
      return isConferenceRoom ? isConference(seat) : !isConference(seat);
    })
    .forEach((memberSeatRecordWithIndex) => {
      const index = memberSeatRecordWithIndex.index;
      memberSeatsSheet.deleteRow(index);
    });
  memberSeatsSheet.appendRow(makeRowContents(memberSeat, columnNames));
}

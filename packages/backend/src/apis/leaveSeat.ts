import { getMemberSeatRecords } from "../utils/getMemberSeatRecords";
import { getEmail } from "./getEmail";

export function leaveSeat(seatId: string) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const memberSeatsSheet = ss.getSheetByName("memberSeats");
  if (!memberSeatsSheet) return;

  const email = getEmail();
  const [memberSeatRecords] = getMemberSeatRecords();

  memberSeatRecords
    .map((memberSeatRecord, i) => ({
      index: i,
      record: memberSeatRecord,
    }))
    .filter(
      (memberSeatRecordWithIndex) =>
        memberSeatRecordWithIndex.record.email === email &&
        memberSeatRecordWithIndex.record.seatId === seatId,
    )
    .forEach((memberSeatRecordWithIndex) => {
      const index = memberSeatRecordWithIndex.index;
      memberSeatsSheet.deleteRow(index + 2);
    });
}

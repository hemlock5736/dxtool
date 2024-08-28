import { MemberSeat } from "../types/MemberSeat";
import { getRecords } from "../utils/getRecords";
import { getEmail } from "./getEmail";

export const leaveSeat = (seatId: string) => {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const memberSeatsSheet = ss.getSheetByName("memberSeats");
  if (!memberSeatsSheet) return;

  const lock = LockService.getDocumentLock();
  lock.waitLock(30000);

  const email = getEmail();
  const [memberSeatRecords] = getRecords<MemberSeat>("memberSeats");

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

  lock.releaseLock();
};

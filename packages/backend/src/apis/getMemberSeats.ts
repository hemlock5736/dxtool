import { MemberSeat, MemberSeats } from "../types/MemberSeat";
import { getRecords } from "../utils/getRecords";
import { setify } from "../utils/setify";

export const getMemberSeats = (): MemberSeats => {
  const [records] = getRecords<MemberSeat>("memberSeats");
  return records;
};

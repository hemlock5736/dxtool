import { MemberSeat, MemberSeats } from "../types/MemberSeat";
import { getRecords } from "../utils/getRecords";

export const getMemberSeats = (): MemberSeats => {
  const [records] = getRecords<MemberSeat>("memberSeats");
  return records;
};

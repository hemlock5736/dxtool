import { MemberSeat } from "../types/MemberSeat";
import { getRecords } from "./getRecords";

export const getMemberSeatRecords = () => {
  return getRecords<MemberSeat>("memberSeats");
};

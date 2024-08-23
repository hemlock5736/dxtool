import { Seat, Seats } from "../types/Seat";
import { getRecords } from "../utils/getRecords";
import { objectify } from "../utils/objectify";

export const getSeats = (): Seats => {
  const [records] = getRecords<Seat>("seats");
  return objectify(records, "id");
};

import { Member, Members } from "../types/Member";
import { getRecords } from "../utils/getRecords";
import { objectify } from "../utils/objectify";

export const getMembers = (): Members => {
  const [records] = getRecords<Member>("members");
  return objectify(records, "email");
};

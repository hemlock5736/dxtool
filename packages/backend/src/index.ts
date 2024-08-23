import { getEmail } from "./apis/getEmail";
import { getMemberSeats } from "./apis/getMemberSeats";
import { getSeats } from "./apis/getSeats";
import { leaveSeat } from "./apis/leaveSeat";
import { sitDown } from "./apis/sitDown";
import { getMembers } from "./apis/getMembers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let global: any;

global.getEmail = getEmail;
global.getMembers = getMembers;
global.getMemberSeats = getMemberSeats;
global.getSeats = getSeats;
global.leaveSeat = leaveSeat;
global.sitDown = sitDown;

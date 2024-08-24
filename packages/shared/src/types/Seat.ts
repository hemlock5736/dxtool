export type Category = "normal" | "fixed" | "conference";

export type Seat = {
  id: string;
  category: Category;
  floor: number;
  lat: number;
  lng: number;
};

export type Seats = {
  [key: string]: Seat;
};

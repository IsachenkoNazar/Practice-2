export interface Seat {
  id: number;
  row: number;
  number: number;
}

export type SeatWithBookingStatus = Seat & { booked: boolean };
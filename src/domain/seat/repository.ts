import type { Seat } from './entity';

export interface SeatRepositories {
  getAllSeats(): Promise<Seat[]>;
  getSeatsById(id: number): Promise<Seat | null>;
  isSeatBooked(sessionId: number, seatId: number): Promise<boolean>;
  findBookedSeatIds(sessionId: number): Promise<number[]>;
  bookSeat(sessionId: number, seatId: number): Promise<void>;
}
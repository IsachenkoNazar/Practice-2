import type { SeatRepositories } from '../../domain/seat/repository';
import type { Seat } from '../../domain/seat/entity';
import type { CreateSeatSession } from '../../transport/dto/requests';

type Database = typeof import('../../prisma/db.js').db;

export function SeatRepository(db: Database): SeatRepositories {
  return {
    async getAllSeats(): Promise<Seat[]> {
      return await db.orm.public.Seat.all();
    },

    async getSeatsById(id: number): Promise<Seat | null> {
      return await db.orm.public.Seat.where({ id }).first();
    },

  async createSeat(seat: CreateSeatSession): Promise<Seat> {
  return await db.orm.public.Seat.create({ row: seat.row, number: seat.number });
},

  async findSeatByRowAndNumber(row: number, number: number): Promise<Seat | null> {
    return await db.orm.public.Seat.where({ row, number }).first();
  },




    async isSeatBooked(sessionId: number, seatId: number): Promise<boolean> {
      const booking = await db.orm.public.SessionSeat
        .where({ sessionId, seatId })
        .first();
      return booking !== null;
    },

    async findBookedSeatIds(sessionId: number): Promise<number[]> {
      const bookings = await db.orm.public.SessionSeat.where({ sessionId }).all();
      const bookedIds: number[] = [];
      for (const booking of bookings) {
        bookedIds.push(booking.seatId);
      }
      return bookedIds;
    },

    async bookSeat(sessionId: number, seatId: number): Promise<void> {
      await db.orm.public.SessionSeat.create({ sessionId, seatId });
    },
  };
}
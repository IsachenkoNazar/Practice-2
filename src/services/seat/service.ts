import type { Seat } from "../../domain/seat/entity";
import type { SeatRepositories } from "../../domain/seat/repository";
import type { SeatServiceContract } from "../movieSession/service.types";

export function CreateSeatService(seatRepository: SeatRepositories) {
    async function getAllSeats(): Promise<Seat[]> {
        return seatRepository.getAllSeats()
    }
    async function getSeatsById(id: number): Promise<Seat | null> {
        return seatRepository.getSeatsById(id)
    }
    async function isSeatBooked(seatId: number, sessionId: number): Promise<boolean> {
        return seatRepository.isSeatBooked( sessionId, seatId )
    }
    async function findBookedSeatIds(sessionId: number): Promise<number[]> {
        return seatRepository.findBookedSeatIds(sessionId)
    }
    async function bookSeat(sessionId: number, seatId: number): Promise<void> {
        return seatRepository.bookSeat(sessionId, seatId)
    }
    return {getAllSeats, getSeatsById, isSeatBooked, findBookedSeatIds, bookSeat}
}
import type { MovieSession } from "../../domain/movieSession/entity.js";
import type { Seat } from "../../domain/seat/entity.js"

export interface MovieSessionService{
    id: number,
    movieTitle: string,
    startAt: string,
}
export type MovieInput = Omit<MovieSessionService, "id">;

export interface MovieServiceContract{
    getAllMovieService: (take?: number) => Promise<MovieSessionService[]>;
    getMovieServiceById: (id: number) => Promise<MovieSessionService | null>
    addNewMovieService: (product: MovieInput) => Promise<MovieSession | null>  
    
}


export type seatInput = Omit<Seat, "id">

export interface SeatServiceContract {
    getAllSeats(): Promise<Seat[]>;
    getSeatsById(id: number): Promise<Seat | null>;
    createSeat(seat: seatInput): Promise<Seat | null>
    isSeatBooked(seatId: number, sessionId: number): Promise<boolean>;
    findBookedSeatIds(sessionId: number): Promise<number[]>;
    bookSeat(sessionId: number, seatId: number): Promise<void>;
}
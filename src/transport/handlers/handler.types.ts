import type { Request, Response } from 'express';
import type { SessionMovieResponse, SessionSeatResponse } from '../dto/responses';
import type { BookSearchRequest, CreateSeatRequest, CreateSessionRequest } from '../dto/requests';
import type { ErrorResponse } from '../dto/errors';
import type { SeatRepositories } from '../../domain/seat/repository';




export interface MovieHandler {
  findAllSession(
    req: Request,
    res: Response<SessionMovieResponse[] | ErrorResponse>
  ): Promise<void>

  findSessionById(
    req: Request<{ id: number }>,
    res: Response<SessionMovieResponse | ErrorResponse>
  ): Promise<void>

  createSession(
    req: Request<{}, SessionMovieResponse | ErrorResponse, CreateSessionRequest>,
    res: Response<SessionMovieResponse | ErrorResponse>
  ): Promise<void>

}


export interface SeatHandler {
    getAllSeats(
        req: Request,
        res: Response<SessionSeatResponse[] | ErrorResponse>
    ): Promise<void>;

    getSeatsById(
    req: Request<{ id: number }>, 
    res: Response<SessionSeatResponse | ErrorResponse>
  ): Promise<void>;
  

  createSeat(
  req: Request<{}, SessionSeatResponse | ErrorResponse, CreateSeatRequest>,
  res: Response<SessionSeatResponse | ErrorResponse>
): Promise<void>;

  isSeatBooked(
    req:Request <{ id: number }, any, BookSearchRequest>,
    res: Response <{isBooked: Boolean} | ErrorResponse>
  ): Promise<void> ;

    bookSeat(
      req: Request<{ id: number }, any, BookSearchRequest>,
      res: Response<{ message: string } | ErrorResponse>
    ): Promise<void>;

}

export interface CreateMovieRequest{
    id: number,
    movieTitle: string,
    startAt: string
}

export interface CreateSeatRequest{
    id: number,
    row: number,
    number: number
}

export interface CreateSessionRequest {
  movieTitle: string;
  startAt: string;
}

export interface CreateSeatSession{
    row: number,
    number: number
}

export interface BookSearchRequest {
    seatId: number;
}
export interface SessionRequest{
    sessionId: number;
}
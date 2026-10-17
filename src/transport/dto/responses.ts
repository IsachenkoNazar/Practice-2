export interface SessionMovieResponse {
    id: number;
    movieTitle: string;
    startAt: string;
}
export interface SessionSeatResponse {
    id: number;
    row: number;
    number: number;
    booked: boolean;
}
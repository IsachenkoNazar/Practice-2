import type { Seat } from '../seat/entity';
import type { MovieSession } from './entity';


export interface createSession{
  movieTitle: string;
  startAt: string
}

export interface MovieSessionRepositories {
  findAllSessions(take?: number): Promise<MovieSession[]>;
  findSessionById(id: number): Promise<MovieSession | null>;
  createSession(session: createSession): Promise<MovieSession>;
}
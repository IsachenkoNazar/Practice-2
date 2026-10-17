import type { MovieSessionRepositories, createSession} from '../../domain/movieSession/repository';
import type { MovieSession } from '../../domain/movieSession/entity';


type Database = typeof import('../../prisma/db.js').db;

export function MovieSessionRepository(db: Database): MovieSessionRepositories {
    return {
        async findAllSessions(take?: number): Promise<MovieSession[]> {
            const sessions = await db.orm.public.MovieSession;
            return await (take? sessions.limit(take): sessions).all();
        },
        async findSessionById(id: number): Promise<MovieSession | null> {
            return await db.orm.public.MovieSession.where({ id}).first();
        },
        async createSession(session: createSession): Promise<MovieSession>{
            return await db.orm.public.MovieSession.create({
                movieTitle: session.movieTitle,
                startAt: session.startAt,
            });

        }
    }
}

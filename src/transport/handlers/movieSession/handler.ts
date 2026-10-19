import type { Request, Response } from 'express';
import type { MovieHandler } from '../handler.types';
import type { MovieServiceContract } from '../../../services/movieSession/service.types';

export function createMovieSessionHandler(service: MovieServiceContract): MovieHandler {
  async function findAllSession(req: Request, res: Response): Promise<void> {
    const take = req.query.take ? Number(req.query.take) : undefined;
    const sessions = await service.getAllMovieService(take);

    res.status(200).json(sessions);
  }

  async function findSessionById(req: Request<{ id: number }>, res: Response): Promise<void> {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      res.status(400).json({ message: 'Session id must be an integer' });
      return;
    }

    const session = await service.getMovieServiceById(id);

    if (!session) {
      res.status(404).json({ message: `Session id not found` });
      return;
    }

    res.status(200).json(session);
  }

  async function createSession(req: Request, res: Response): Promise<void> {
    const { movieTitle, startAt } = req.body;

    if (
      typeof movieTitle !== 'string' ||
      !movieTitle.trim() ||
      typeof startAt !== 'string' ||
      Number.isNaN(Date.parse(startAt))
    ) {
      res.status(422).json({ message: 'Invalid session data' });
      return;
    }

    try {
      const createdSession = await service.addNewMovieService({
        movieTitle: movieTitle.trim(),
        startAt,
      });

      if (!createdSession) {
        res.status(409).json({ message: 'Session already exists' });
        return;
      }

      res.status(201).json(createdSession);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create session' });
    }
  }

  return { findAllSession, findSessionById, createSession };
}
import { Router } from 'express';
import type { SeatHandler, MovieHandler } from '../handlers/handler.types.ts';

export function createSessionRouter(handlerMovie: MovieHandler): Router {
  const router = Router();


  router.get('/session', handlerMovie.findAllSession);
  router.get('/session/:id', handlerMovie.findSessionById);
  router.post('/session', handlerMovie.createSession);

  return router;
}

export function createSeatRouter(handler: SeatHandler): Router {
  const router = Router();

  router.get('/seat', handler.getAllSeats);
  router.get('/seat/:id', handler.getSeatsById);
  router.post('/seat', handler.createSeat);
  router.post('/seat/book', handler.bookSeat);

  return router;
}
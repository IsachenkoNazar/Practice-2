import { Router } from 'express';
import type { SeatHandler, MovieHandler } from '../handlers/handler.types.ts';

export function createSessionRouter(handlerMovie: MovieHandler): Router {
  const router = Router();


  router.get('/session', handlerMovie.findAllSession);
  router.get('/session/:id', handlerMovie.findSessionById);
  router.post('/session', handlerMovie.createSession);


//   router.get('/session/:id/seats', handler.getAllSeats);
//   router.get('/session/:id/booked', handler.findBookedSeatIds);
//   router.post('/session/:id/seats', handler.createSeat);

  return router;
}

// handler: SeatHandler,
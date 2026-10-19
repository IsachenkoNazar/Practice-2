import type { Request, Response } from 'express';
import type { Seat } from '../../../domain/seat/entity';
import type { SeatServiceContract } from '../../../services/movieSession/service.types';
import type { SeatHandler } from '../handler.types';
import { isIntegerIn } from '@prisma/orm-postgres/components';

export function createSeatSessionHandler(seatService: SeatServiceContract): SeatHandler{

async function getAllSeats(req: Request, res: Response): Promise<void> {
    try {
        const seats = await seatService.getAllSeats();
        res.status(200).json(seats);
    } catch (error) {
        res.status(500).json({ 
            message: 'Internal server error', 
            error: (error as Error).message 
        });
    }
}
async function getSeatsById(req: Request<{ id: number }>, res: Response): Promise<void> {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({ message: 'Id must have a positive integer' });
        return;
    }

    try {
        const seat = await seatService.getSeatsById(id);
        
        if (!seat) {
            res.status(404).json({ message: 'Seat not found' });
            return;
        }

        res.status(200).json(seat);
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
        return
    }
}

async function createSeat(req: Request, res: Response): Promise<void>{
    const {row, number} = req.body

    if(
        typeof row !== 'number' || Number.isNaN(row) || row < 0 ||
        typeof number !== 'number' || Number.isNaN(number) || number < 0
    ) {
        res.status(422).json({message: "Invalid seat data"})
        return
    }

    try{
        const createdSeat = await seatService.createSeat({
            row,
            number
    });

    if(!createdSeat) {
        res.status(409).json({message: "Seat already exist"})
        return
    }

    res.status(201).json(createdSeat)
}   catch(error){
    console.error(error);
    res.status(500).json({ message: 'Failed to create session' });
}
}

async function isSeatBooked(req: Request<{id: number}>, res: Response): Promise<void> {
    const { seatId, sessionId } = req.body;
    if (seatId === undefined || sessionId === undefined) {
        res.status(400).json({ message: 'Missing required fields: seatId and sessionId are required'});
        return;
    }

    const parsedSeatId = Number(seatId);
    const parsedSessionId = Number(sessionId);

    if (!Number.isInteger(parsedSeatId) || !Number.isInteger(parsedSessionId)) {
        res.status(422).json({ message: 'seatId and sessionId must be integers' });
        return;
    }

    try {
        const bookedSeat = await seatService.isSeatBooked(parsedSeatId, parsedSessionId);
        res.status(200).json({ isBooked: Boolean(bookedSeat) });
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
}

async function bookSeat(req: Request<{id: number}>, res: Response): Promise<void> {
    const { seatId, sessionId } = req.body;

    if (seatId === undefined || sessionId === undefined) {
        res.status(400).json({ message: ' seatId and sessionId was not found' });
        return;
    }

    const parsedSeatId = Number(seatId);
    const parsedSessionId = Number(sessionId);

    if (!Number.isInteger(parsedSeatId) || !Number.isInteger(parsedSessionId)) {
        res.status(422).json({ message: 'seatId and sessionId must be valid integers' });
        return;
    }

    try {
        const seat = await seatService.getSeatsById(parsedSeatId);
        
        if (!seat) {
            res.status(404).json({ message: 'Seat not found' });
            return;
        }

        const alreadyBooked = await seatService.isSeatBooked(parsedSeatId, parsedSessionId);
        if (alreadyBooked) {
            res.status(409).json({ message: 'Seat is already booked for this session' });
            return;
        }

        await seatService.bookSeat(parsedSessionId, parsedSeatId);
        res.status(200).json({ message: 'Seat successfully booked' });
    } catch (error) {res.status(500).json({message: 'Internal server error'});
    }
}

return {getAllSeats, getSeatsById,createSeat, isSeatBooked, bookSeat}
}

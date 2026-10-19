import express from "express"
import { MovieSessionRepository } from "./repositories/movieSession/repository"
import { createMovieService } from "./services/movieSession/service"
import { createMovieSessionHandler } from "./transport/handlers/movieSession/handler"
import { createSeatRouter, createSessionRouter } from "./transport/routers/router"
import { db } from "./prisma/db"
import { SeatRepository } from "./repositories/seat/repository"
import { createSeatSessionHandler } from "./transport/handlers/seat/handler"
import { CreateSeatService } from "./services/seat/service"


const PORT = 8000
const HOST = "localhost"

const app = express()

const movieReposiory = MovieSessionRepository(db)
const movieService = createMovieService(movieReposiory)
const MovieHandler = createMovieSessionHandler(movieService)
const movieRouter = createSessionRouter(MovieHandler);

const seatRepository = SeatRepository(db);
const seatService = CreateSeatService(seatRepository);
const seatHandler = createSeatSessionHandler(seatService);
const seatRouter = createSeatRouter(seatHandler);


app.use(express.json())
app.use(movieRouter)
app.use(seatRouter)

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}/session`)
    console.log(`Server is running on http://${HOST}:${PORT}/session/id`)
    console.log(`Server is running on http://${HOST}:${PORT}/seat`)
    console.log(`Server is running on http://${HOST}:${PORT}/seat/book`)
})


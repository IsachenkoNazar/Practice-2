import express from "express"
import { MovieSessionRepository } from "./repositories/movieSession/repository"
import { createMovieService } from "./services/movieSession/service"
import { createMovieSessionHandler } from "./transport/handlers/movieSession/handler"
import { createSessionRouter } from "./transport/routers/router"
import { db } from "./prisma/db"


const PORT = 8000
const HOST = "localhost"

const app = express()

const movieReposiory = MovieSessionRepository(db)
const movieService = createMovieService(movieReposiory)
const MovieHandler = createMovieSessionHandler(movieService)
const movieRouter = createSessionRouter(MovieHandler);


app.use(express.json())
app.use("/movieSessions",movieRouter)

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}/session`)
})
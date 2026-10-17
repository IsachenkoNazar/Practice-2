import type { MovieSessionRepositories } from "../../domain/movieSession/repository";
import type { MovieInput, MovieServiceContract } from "./service.types";

export function createMovieService(movieRepository: MovieSessionRepositories): MovieServiceContract {
  function getAllMovieService(take?: number) {
    return movieRepository.findAllSessions(take);
  }

  function getMovieServiceById(id: number) {
    return movieRepository.findSessionById(id);
  }

  async function addNewMovieService(data: MovieInput) {
    const { movieTitle, startAt } = data;

    return await movieRepository.createSession({ movieTitle, startAt });
  }

  return {
    getAllMovieService,
    getMovieServiceById,
    addNewMovieService,
  };
}
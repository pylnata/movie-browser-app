import { axiosMovies as axios } from "../axios";

export const MOVIE_DB_IMAGE_URL = {
  small: "https://image.tmdb.org/t/p/w185",
  medium: "https://image.tmdb.org/t/p/w300",
  large: "https://image.tmdb.org/t/p/w1280",
  original: "https://image.tmdb.org/t/p/original"
};

export const getMovies = requestData => {
  const filter = requestData.filter || "popular";
  return axios.get(`/movie/${filter}`, { params: { page: requestData.page } });
};

export const searchMovies = requestData => {
  return axios.get(`/search/movie`, {
    params: { query: requestData.query, page: requestData.page }
  });
};

export const getGenres = () => {
  return axios.get("/genre/movie/list");
};

export const getMovie = id => {
  return axios.get(`/movie/${id}`);
};

export const getActors = id => {
  return axios.get(`/movie/${id}/credits`);
};

export const getMovieImages = id => {
  return axios.get(`/movie/${id}/images`, { params: { language: "null" } });
};

export const getRecommendations = id => {
  return axios.get(`/movie/${id}/recommendations`, {
    params: {
      language: "null",
      page: 1
    }
  });
};

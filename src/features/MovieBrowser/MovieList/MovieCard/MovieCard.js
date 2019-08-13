import React from "react";
import { Card, CardImg, CardBody, CardTitle } from "reactstrap";
import { MOVIE_DB_IMAGE_URL } from "@/api/apiMovies";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import WatchListButton from "@/features/WatchList/WatchListButton/WatchListButton";

import noPhoto from "./noimage.png";

import "./MovieCard.scss";

const MovieCard = props => {
  const { movie, genres } = props;

  let genresStr = "";
  if (movie.genre_ids) {
    genresStr = movie.genre_ids
      .map(id => {
        const item = genres.find(item => item.id === id);
        return item ? item.name : null;
      })
      .join(", ");
  }

  return (
    <Card className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <CardImg
          className="fadeIn animated"
          top
          src={
            movie.poster_path
              ? `${MOVIE_DB_IMAGE_URL.medium}${movie.poster_path}`
              : noPhoto
          }
          alt={movie.title}
        />
      </Link>
      <CardBody>
        <Link to={`/movie/${movie.id}`}>
          {movie.vote_average > 0 && (
            <span className="card-rating">{movie.vote_average}</span>
          )}
          <CardTitle className="mb-1 mr-4">{movie.title}</CardTitle>
          {genresStr && <p className="small mb-0">{genresStr}</p>}
        </Link>
        {props.withWatchListButton && <WatchListButton className="movie-watchbtn" movie={movie} short />}
      </CardBody>
    </Card>
  );
};

MovieCard.propTypes = {
  genres: PropTypes.array,
  movie: PropTypes.object.isRequired
};

export { MovieCard };

export default MovieCard;

import React from "react";
import PropTypes from "prop-types";

import { MOVIE_DB_IMAGE_URL } from "@/api/apiMovies";

const Actor = props => {
  const { actor } = props;

  return (
    <div className="movie-cast__item">
      {actor.profile_path ? (
        <img
          className="movie-cast__img"
          alt={actor.name}
          title={actor.name}
          src={`${MOVIE_DB_IMAGE_URL.small + actor.profile_path}`}
        />
      ) : (
        <div className="movie-cast__nophoto">NO PHOTO</div>
      )}
      <div className="movie-cast__info">
        {actor.name} <br />
        <span className="small">{actor.character}</span>
      </div>
    </div>
  );
};

Actor.propTypes = {
  actor: PropTypes.object.isRequired,
}

export default Actor;

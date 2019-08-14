import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";
import PropTypes from "prop-types";

import actions from "../actions";
import actionsMovieBrowser from "@/features/MovieBrowser/actions";
import { MovieCard } from "@/features/MovieBrowser/MovieList";

import "./Recommendations.scss";

class Recommendations extends Component {
  componentDidMount() {
    const { match, getRecommendations, genres, getGenres } = this.props;
    if (!genres.data) {
      getGenres();
    }
    getRecommendations(match.params.movie_id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.movie_id !== prevProps.match.params.movie_id) {
      const { match, getRecommendations } = this.props;
      getRecommendations(match.params.movie_id);
    }
  }

  render() {
    const { movies, genres } = this.props;
    if (!movies.data || !genres.data) return <Spinner />;

    if (movies.data.length < 1) return null;

    const movieList = movies.data.map(movie => (
      <MovieCard movie={movie} genres={genres.data} key={movie.id} />
    ));
    return (
      <div className="movie-recommendations">
        <h3 className="list-title list-title-dark mb-4">Recommendations</h3>
        <div className={`d-flex flex-wrap justify-content-center`}>
          {movieList}
        </div>
      </div>
    );
  }
}

Recommendations.propTypes = {
  movies: PropTypes.object.isRequired,
  genres: PropTypes.object.isRequired,
  getRecommendations: PropTypes.func.isRequired,
  getGenres: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      movie_id: PropTypes.string.isRequired
    })
  })
};

const mapStateToProps = ({ movieDetails, movieBrowser }) => ({
  movies: movieDetails.recommendations,
  genres: movieBrowser.genres
});

const mapDispatchToProps = dispatch => ({
  getRecommendations: id => dispatch(actions.getRecommendations(id)),
  getGenres: () => dispatch(actionsMovieBrowser.getGenres())
});

const connectedRecommendations = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Recommendations)
);
export default connectedRecommendations;
export { Recommendations };

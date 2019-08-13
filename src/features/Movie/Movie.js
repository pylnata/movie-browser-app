import React from "react";
import { connect } from "react-redux";
import { Badge, Container, Spinner } from "reactstrap";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

import actions from "./actions";
import ActorList from "./ActorList/ActorList";
import ImageList from "./ImageList/ImageList";
import Recommendations from "./Recommendations/Recommendations";
import { WatchListButton } from "@/features/WatchList/WatchListButton/WatchListButton";
import { MOVIE_DB_IMAGE_URL } from "@/api/apiMovies";
import WithHttpErrorHandler from "@/hoc/WithHttpErrorHandler";
import { axiosMovies } from "@/axios";

import "./Movie.scss";

class Movie extends React.Component {
  componentDidMount() {
    document.documentElement.classList.toggle("nav-dark");
    const { match, getMovie } = this.props;
    getMovie(match.params.movie_id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.movie_id !== prevProps.match.params.movie_id) {
      const { match, getMovie } = this.props;
      getMovie(match.params.movie_id);
    }
  }

  componentWillUnmount() {
    document.documentElement.classList.toggle("nav-dark");
  }

  getDurationStr = mins => {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    m = m < 10 ? "0" + m : m;
    return `${h}h ${m}m`;
  };

  getReleaseDateStr = str => {
    const date = new Date(str);
    return (
      date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
    );
  };

  render() {
    const { movie, match } = this.props;
    const movieData = movie.data;
    if (!movieData || movieData.id !== Number(match.params.movie_id)) {
      return <Spinner />;
    }

    const budgetStr = movieData.budget.toLocaleString();
    const durationStr = this.getDurationStr(movieData.runtime);

    return (
      <>
        <Helmet>
          <title>{movieData.title} | MovieBrowser</title>
        </Helmet>

        <div
          className="movie-backdrop w-100 h-100 position-fixed fixed-top"
          style={{
            backgroundSize: "cover",
            backgroundImage: `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0, .5)), url("${MOVIE_DB_IMAGE_URL.large +
              movieData.backdrop_path}")`
          }}
        />
        <Container className="d-flex flex-column">
          <div className="movie">
            <img
              src={`${MOVIE_DB_IMAGE_URL.medium + movieData.poster_path}`}
              alt={movieData.title}
              className="movie__img"
            />

            <div className="movie__info d-flex flex-column justify-content-between p-3 align-items-start">
              <h2>{movieData.title}</h2>
              {movieData.tagline && (
                <h6 className="movie__tagline">{movieData.tagline}</h6>
              )}
              <div className="movie__control">
                <div title="Rating" className="movie__rating">
                  {movieData.vote_average}
                </div>
                <WatchListButton movie={movieData} />
              </div>
              <p className="movie__overview">{movieData.overview}</p>

              <div>
                <span className="mr-2">Genres:</span>{" "}
                {movieData.genres.map(o => (
                  <Badge color="warning" className="mb-1" key={`g${o.id}`}>
                    {o.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="movie__stat d-flex justify-content-between align-items-center">
              {movieData.release_date && (
                <div>
                    <i className="fa fa-clock-o movie__icon" />
                    Release date:{" "}
                  {this.getReleaseDateStr(movieData.release_date)}
                </div>
              )}
              <div>
                  <i className="fas fa-history movie__icon" />
                  Duration: {" "}
                {durationStr}
              </div>
              <div>
                  <i className="fa fa-money movie__icon" />
                  Budget: {" "}
                ${budgetStr}
              </div>
            </div>
          </div>

          <ActorList />
          <ImageList />
          <Recommendations />
        </Container>
      </>
    );
  }
}

Movie.propTypes = {
  movie: PropTypes.object.isRequired,
  getMovie: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      movie_id: PropTypes.string.isRequired
    })
  })
};

const mapStateToProps = ({ movieDetails, auth, watchList }) => ({
  movie: movieDetails.movie
});

const mapDispatchToProps = dispatch => ({
  getMovie: id => dispatch(actions.getMovie(id))
});

const connectedMovie = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithHttpErrorHandler(Movie, axiosMovies));

export default connectedMovie;
export { connectedMovie as Movie };

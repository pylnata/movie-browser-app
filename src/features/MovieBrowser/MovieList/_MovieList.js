import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Spinner } from "reactstrap";
import PropTypes from "prop-types";

import { MovieCard } from "./MovieCard/MovieCard";
import actions from "../actions";
import actionsSearch from "@/features/Search/actions";
import WithHttpErrorHandler from "@/hoc/WithHttpErrorHandler";
import { axiosMovies } from "@/axios";

import "./MovieList.scss";

class MovieList extends Component {
  componentDidMount() {
    const { match, genres, getGenres, getMovies, searchMovies } = this.props;
    if (!genres.data) {
      getGenres();
    }
    if (match.query) {
      searchMovies(match.query, match.page);
    } else {
      getMovies(match.params.page, match.params.filter);
    }
  }

  componentDidUpdate(prevProps) {
    const { match, getMovies, searchMovies } = this.props;
    if (
      prevProps.match.params.filter !== match.params.filter ||
      prevProps.match.params.page !== match.params.page
    ) {
      if (match.query) {
        searchMovies(match.query, match.page);
      } else {
        getMovies(match.params.page, match.params.filter);
      }
    }
  }

  pageChangeHandler = data => {
    if (this.props.match.query) {
      this.props.history.push(
        `/search/${this.props.match.params.query}/${data.selected + 1}`
      );
    } else {
      this.props.history.push(
        `/${
          this.props.match.params.filter
            ? this.props.match.params.filter
            : "popular"
        }/${data.selected + 1}`
      );
    }
  };

  render() {
    const { movies, genres } = this.props;

    if (genres.isLoading || !movies.data) return <Spinner />;

    const movieList = movies.data.results.map(movie => (
      <MovieCard movie={movie} genres={genres.data} key={movie.id} />
    ));

    return (
      <>
        <div className="d-flex flex-wrap justify-content-md-between justify-content-center">
          {movieList}
        </div>
        <ReactPaginate
          previousLabel="&larr;"
          nextLabel="&rarr;"
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={movies.data.total_pages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.pageChangeHandler}
          disableInitialCallback={true}
          initialPage={this.props.match.params.page - 1}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </>
    );
  }
}

MovieList.propTypes = {
  genres: PropTypes.object.isRequired,
  movies: PropTypes.object.isRequired,
  getGenres: PropTypes.func.isRequired,
  getMovies: PropTypes.func.isRequired,
  searchMovies: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string,
      filter: PropTypes.string
    })
  }).isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = ({ movieBrowser }) => ({
  genres: movieBrowser.genres,
  movies: movieBrowser.movies
});

const mapDispatchToProps = dispatch => ({
  getGenres: () => dispatch(actions.getGenres()),
  getMovies: (page, filter) => dispatch(actions.getMovies(page, filter)),
  searchMovies: (query, page) =>
    dispatch(actionsSearch.searchMovies(query, page))
});

const connectedMovieList = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithHttpErrorHandler(MovieList, axiosMovies))
);

export default connectedMovieList;
export { connectedMovieList as MovieList };

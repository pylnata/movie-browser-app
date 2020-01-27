import React, { Component } from "react";
import { Container } from "reactstrap";
import { Spinner } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import MovieFilter from "./MovieFilter/MovieFilter";
import MovieList from "./MovieList/MovieList";
import actions from "./actions";
import WithHttpErrorHandler from "@/hoc/WithHttpErrorHandler";
import { axiosMovies as axios } from "@/axios";

class MovieBrowser extends Component {

  componentDidMount() {
    const { match, genres, getGenres, getMovies } = this.props;
    if (!genres.data) {
      getGenres();
    }
    getMovies(match.params.page, match.params.filter);
  }

  componentDidUpdate(prevProps) {
    const { match, getMovies } = this.props;
    if (
      prevProps.match.params.filter !== match.params.filter ||
      prevProps.match.params.page !== match.params.page
    ) {
      getMovies(match.params.page, match.params.filter);
    }
  }

  pageChangeHandler = data => {
    this.props.history.push(
      `/${
        this.props.match.params.filter
          ? this.props.match.params.filter
          : "popular"
      }/${data.selected + 1}`
    );
    window.scrollTo(0,0);

  };

  render() {
    const { movies, genres } = this.props;

    if (genres.isLoading || !movies.data) return <Spinner />;

    return (
      <Container>
        <MovieFilter />
          <MovieList
            movies={movies.data.results}
            pageCount={movies.data.total_pages}
            initialPage={this.props.match.params.page - 1}
            onPageChange={this.pageChangeHandler}
            genres={genres.data}
          />
      </Container>
    );
  }
}

MovieBrowser.propTypes = {
  genres: PropTypes.object.isRequired,
  movies: PropTypes.object.isRequired,
  getGenres: PropTypes.func.isRequired,
  getMovies: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string,
      filter: PropTypes.string
    })
  }).isRequired,
  history: PropTypes.object.isRequired
}

const mapStateToProps = ({ movieBrowser }) => ({
  genres: movieBrowser.genres,
  movies: movieBrowser.movies
});

const mapDispatchToProps = dispatch => ({
  getGenres: () => dispatch(actions.getGenres()),
  getMovies: (page, filter) => dispatch(actions.getMovies(page, filter))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithHttpErrorHandler(MovieBrowser, axios));



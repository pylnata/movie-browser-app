import React, { Component } from "react";
import { Container, Spinner } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import MovieList from "@/features/MovieBrowser/MovieList/MovieList";
import actions from "./actions";
import movieBrowserActions from "@/features/MovieBrowser/actions";
import WithHttpErrorHandler from "@/hoc/WithHttpErrorHandler";
import { axiosMovies } from "@/axios";

class Search extends Component {
  componentDidMount() {
    const { match, genres, getGenres, searchMovies } = this.props;
    if (!genres.data) {
      getGenres();
    }
    searchMovies(match.params.query, match.params.page);
  }

  componentDidUpdate(prevProps) {
    const { match, searchMovies } = this.props;
    if (
      prevProps.match.params.query !== match.params.query ||
      prevProps.match.params.page !== match.params.page
    ) {
      searchMovies(match.params.query, match.params.page);
    }
  }

  componentWillUnmount() {
    this.props.clearSearch();
  }

  pageChangeHandler = data => {
    this.props.history.push(
      `/search/${this.props.match.params.query}/${data.selected + 1}`
    );
  };

  render() {
    const { movies, genres } = this.props;
    if (genres.isLoading || !movies.data) return <Spinner />;
    return (
      <Container style={{marginTop: '130px'}}>

      <h1 className="list-title mb-5">Search results "{movies.request.query}" ({movies.data.total_results}) </h1>

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

Search.propTypes = {
  genres: PropTypes.object.isRequired,
  movies: PropTypes.object.isRequired,
  getGenres: PropTypes.func.isRequired,
  searchMovies: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string,
      query: PropTypes.string
    })
  }).isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = ({ movieBrowser, search }) => ({
  genres: movieBrowser.genres,
  movies: search.results
});

const mapDispatchToProps = dispatch => ({
  getGenres: () => dispatch(movieBrowserActions.getGenres()),
  searchMovies: (query, page) => dispatch(actions.searchMovies(query, page)),
  clearSearch: () => dispatch(actions.setSearchText(""))
});

const connectedSearch = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithHttpErrorHandler(Search, axiosMovies));

export default connectedSearch;
export { connectedSearch as Search };

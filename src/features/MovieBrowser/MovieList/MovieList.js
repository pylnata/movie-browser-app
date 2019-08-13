import React from "react";
import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";

import MovieCard from "./MovieCard/MovieCard";
import "./MovieList.scss";

const MovieList = props => {
  const list = props.movies.map(movie => (
    <MovieCard movie={movie} genres={props.genres} key={movie.id} />
  ));

  return (
    <>
      <div className="d-flex flex-wrap justify-content-md-between justify-content-center">
        {list}
      </div>

      <ReactPaginate
        previousLabel="&larr;"
        nextLabel="&rarr;"
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={props.pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={props.onPageChange}
        disableInitialCallback={true}
        initialPage={props.initialPage}
        forcePage={props.initialPage}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />

    </>
  );
};

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
  pageCount: PropTypes.number,
  initialPage: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  genres: PropTypes.array
};

MovieList.defaultProps = {
  //initialPage: 1,
  //pageCount: 1
};

export { MovieList };
export default MovieList;

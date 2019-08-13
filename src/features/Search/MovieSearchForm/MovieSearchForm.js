import React from "react";
import { Input } from "reactstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import actions from "../actions";

import "./MovieSearchForm.scss";

const MovieSearchForm = props => {

  const onChangeHandler = event => {
    const query = event.target.value;
    props.setSearchText(query);
    if (query.length >= 2) {
      props.history.push(`/search/${query}`);
    } else if (query.length === 0) {
      props.history.push(`/`);
    }
  };

  return (
    <div className="d-flex flex-column w-100">
      <div className="position-relative">
        <Input
          type="text"
          name="search"
          placeholder="Search by movie title"
          onChange={onChangeHandler}
          value={props.text}
          className="search-input"
        />
        <i className="fas fa-search search-btn" />
      </div>
    </div>
  );
};

MovieSearchForm.propTypes = {
  text: PropTypes.string,
  setSearchText: PropTypes.func.isRequired
};

const mapStateToProps = ({ search }) => ({ text: search.searchText });

const mapDispatchToProps = dispatch => ({
  setSearchText: text => dispatch(actions.setSearchText(text))
});

const enhauncedMovieSearchForm = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MovieSearchForm)
);

export { enhauncedMovieSearchForm as MovieSearchForm };

export default enhauncedMovieSearchForm;

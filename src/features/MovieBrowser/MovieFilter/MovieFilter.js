import React from "react";
import { Button, ButtonGroup } from "reactstrap";
import { withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

import "./MovieFilter.scss";

export const MovieFilter = props => {
  const filters = [
    { key: "popular", value: "Popular" },
    { key: "now_playing", value: "Now playing" },
    { key: "top_rated", value: "Top rated" },
    { key: "upcoming", value: "Upcoming" }
  ];

  const onClick = event => {
    props.history.push(`/${event.target.getAttribute("title")}/1`);
  };

  const filterKey = props.match.params.filter
    ? props.match.params.filter
    : filters[0]["key"];

  const filter = filters.find(item => item.key === filterKey);
  return (
    <>
      <Helmet>
        <title>{filter.value} / MovieBrowser</title>
      </Helmet>

      <ButtonGroup className="movie-filter">
        {filters.map(item => (
          <Button
            key={item.key}
            title={item.key}
            color={filterKey === item.key ? "success" : "transparent"}
            onClick={onClick}
          >
            {item.value}
          </Button>
        ))}
      </ButtonGroup>
    </>
  );
};

MovieFilter.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      filter: PropTypes.string
    })
  }),
  history: PropTypes.object.isRequired
};

export default withRouter(MovieFilter);

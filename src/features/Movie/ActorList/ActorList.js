import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Spinner } from "reactstrap";
import PropTypes from "prop-types";

import actions from "../actions";
import ActorItem from "./ActorItem";

import "./ActorList.scss";

class ActorList extends Component {
  state = { showAll: false };

  componentDidMount() {
    const { match, getActors } = this.props;
    getActors(match.params.movie_id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.movie_id !== prevProps.match.params.movie_id) {
      const { match, getActors } = this.props;
      getActors(match.params.movie_id);
    }
  }

  showAllHandler = () => {
    this.setState(prevState => ({ showAll: !prevState.showAll }));
  };

  render() {
    const { actors } = this.props;

    if (!actors.data) return <Spinner />;

    const actorsToShow = this.state.showAll
      ? actors.data
      : actors.data.slice(0, 6);

      if (actorsToShow.length < 1) return null;

    return (
      <div className="movie-cast">
        <div className="d-flex justify-content-between align-align-items-center">
          <h3 className="list-title list-title-dark mb-4">Actors</h3>

          {actors.data.length > 6 && (
            <div className="custom-control custom-switch pr-5 info">
              <input
                onChange={this.showAllHandler}
                checked={this.state.showAll}
                type="checkbox"
                className="custom-control-input info"
                id="show-all"
              />
              <label className="custom-control-label" htmlFor="show-all">
                Show all
              </label>
            </div>
          )}
        </div>

        <div className="movie-cast__list d-flex flex-wrap justify-content-md-center justify-content-lg-start justify-content-center align-items-stretch">
          {actorsToShow.map(actor => (
            <ActorItem actor={actor} key={actor.id} />
          ))}
        </div>
      </div>
    );
  }
}

ActorList.propTypes = {
  actors: PropTypes.object.isRequired,
  getActors: PropTypes.func.isRequired,
  match: PropTypes.shape({
    match: PropTypes.shape({
      params: {
        movie_id: PropTypes.string.isRequired
      }
    })
  })
};

const mapStateToProps = ({ movieDetails }) => ({
  actors: movieDetails.actors
});

const mapDispatchToProps = dispatch => ({
  getActors: id => dispatch(actions.getActors(id))
});

const connectedActorList = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ActorList)
);

export default connectedActorList;

export { connectedActorList as ActorList };

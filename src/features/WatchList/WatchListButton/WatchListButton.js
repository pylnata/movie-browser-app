import React from "react";
import { connect } from "react-redux";
import { Spinner, Button, UncontrolledTooltip } from "reactstrap";
import PropTypes from "prop-types";

import actions from "../actions";
import WithHttpErrorHandler from "@/hoc/WithHttpErrorHandler";
import { axiosFirebase } from "@/axios";

class WatchListButton extends React.Component {
  componentDidMount() {
    const { userId, token, watchList, getWatchList } = this.props;
    if (userId && !watchList.data) {
      getWatchList(userId, token);
    }
  }

  clickWatchListHandler = isInWatchList => {
    const { movie, userId, token } = this.props;
    if (!userId) return false;
    if (!isInWatchList) {
      this.props.addMovieWatchList(
        {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path
        },
        userId,
        token
      );
    } else {
      this.props.removeMovieWatchList(movie.id, userId, token);
    }
  };

  render() {
    const { movie, userId, watchList, short } = this.props;

    if (userId && watchList.data === undefined) {
      return <Spinner />;
    }

    const labelRemove = short ? " Remove " : " Remove from my WatchList ";

    const isInWatchList =
      userId && this.props.watchList.data.find(item => item.id === movie.id);

    return (
      <>
        <Button
          className={`movie__like mr-2 ${this.props.className}`}
          color={isInWatchList ? "secondary" : "success"}
          onClick={() => this.clickWatchListHandler(isInWatchList)}
          id="watchlist-btn"
        >
          <i className="far fa-bookmark" />
          {isInWatchList ? labelRemove : " Add to my Watchlist"}
        </Button>

        {!userId && (
          <UncontrolledTooltip
            placement="bottom"
            target="watchlist-btn"
          >
            Please sign in to add movie to watchlist
          </UncontrolledTooltip>
        )}
      </>
    );
  }
}

WatchListButton.propTypes = {
  movie: PropTypes.object.isRequired,
  userId: PropTypes.string,
  token: PropTypes.string,
  watchList: PropTypes.object.isRequired,
  addMovieWatchList: PropTypes.func.isRequired,
  removeMovieWatchList: PropTypes.func.isRequired,
  getWatchList: PropTypes.func.isRequired
};

const mapStateToProps = ({ movieDetails, auth, watchList }) => ({
  userId: auth.data.userId,
  token: auth.data.token,
  watchList: watchList
});

const mapDispatchToProps = dispatch => ({
  addMovieWatchList: (data, userId, token) =>
    dispatch(actions.addMovieWatchList(data, userId, token)),
  removeMovieWatchList: (movieId, userId, token) =>
    dispatch(actions.removeMovieWatchList(movieId, userId, token)),
  getWatchList: (userId, token) => dispatch(actions.getWatchList(userId, token))
});

const connectedWatchListButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithHttpErrorHandler(WatchListButton, axiosFirebase));

export default connectedWatchListButton;
export { connectedWatchListButton as WatchListButton };

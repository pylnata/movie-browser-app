import React, { Component } from "react";
import { connect } from "react-redux";
import { Spinner, Container } from "reactstrap";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

import actions from "./actions";
import { MovieCard } from "@/features/MovieBrowser/MovieList";
import WithHttpErrorHandler from "@/hoc/WithHttpErrorHandler";
import { axiosFirebase as axios } from "@/axios";

class WatchList extends Component {
  componentDidMount() {
    const { userId, token, getWatchList } = this.props;
    getWatchList(userId, token);
  }

  render() {
    const { data } = this.props.watchList;

    if (!data) return <Spinner />;

    let movieList = (
      <div className="text-center  w-100 p-5 text-white">
        You don't have movies in you Watchlist
      </div>
    );

    if (data.length) {
      movieList = data.map(movie => {
        return (
          <div key={movie.id} className="mr-sm-2 mr-md-4">
            <MovieCard movie={movie} withWatchListButton />
          </div>
        );
      });
    }

    return (
      <>
        <Helmet>
          <title>My Watchlist | MovieBrowser</title>
        </Helmet>

        <Container style={{ marginTop: "100px" }} className="p-2">
          <h1 className="list-title list-title-dark mb-5">My Watchlist</h1>
          <div className="d-flex flex-wrap justify-content-md-start justify-content-center">
            {movieList}
          </div>
        </Container>
      </>
    );
  }
}

WatchList.propTypes = {
  watchList: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  getWatchList: PropTypes.func.isRequired
};

const mapStateToProps = ({ watchList, auth }) => ({
  watchList: watchList,
  userId: auth.data.userId,
  token: auth.data.token
});
const mapDispatchToProps = dispatch => ({
  getWatchList: (userId, token) => dispatch(actions.getWatchList(userId, token))
});

const connectWatchList = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithHttpErrorHandler(WatchList, axios));

export default connectWatchList;

export { connectWatchList as WatchList };

import {
  createActionCreator,
  createActionsForAsyncAction
} from "@/helpers/redux";

export const actionKeys = {
  ADD_MOVIE_WATCHLIST: "ADD_MOVIE_WATCHLIST",
  REMOVE_MOVIE_WATCHLIST: "REMOVE_MOVIE_WATCHLIST",
  GET_WATCHLIST: "GET_WATCHLIST"
};

const actions = {
  addMovieWatchList: (data, userId, token) =>
    createActionCreator(actionKeys.ADD_MOVIE_WATCHLIST, { data, userId, token }),
  removeMovieWatchList: (movieId, userId, token) =>
    createActionCreator(actionKeys.REMOVE_MOVIE_WATCHLIST, { movieId, userId, token }),
  getWatchList: (userId, token) => createActionCreator(actionKeys.GET_WATCHLIST, {userId, token })
};

export const asyncActionMaps = {
  [actionKeys.ADD_MOVIE_WATCHLIST]: createActionsForAsyncAction(actionKeys.ADD_MOVIE_WATCHLIST),
  [actionKeys.REMOVE_MOVIE_WATCHLIST]: createActionsForAsyncAction(actionKeys.REMOVE_MOVIE_WATCHLIST),
  [actionKeys.GET_WATCHLIST]: createActionsForAsyncAction(actionKeys.GET_WATCHLIST),
};

export default actions;

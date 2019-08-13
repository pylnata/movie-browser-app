import {
  createActionCreator,
  createActionsForAsyncAction
} from "@/helpers/redux";

export const actionKeys = {
  SEARCH_MOVIES: "SEARCH_MOVIES",
  SET_SEARCH_TEXT: "SET_SEARCH_TEXT"
};

const actions = {
  searchMovies: (query, page) =>
    createActionCreator(actionKeys.SEARCH_MOVIES, { query, page }),
  setSearchText: text =>
    createActionCreator(actionKeys.SET_SEARCH_TEXT, { text })
};

export const asyncActionMaps = {
  [actionKeys.SEARCH_MOVIES]: createActionsForAsyncAction(
    actionKeys.SEARCH_MOVIES
  )
};

export default actions;

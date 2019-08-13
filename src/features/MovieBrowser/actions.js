import {
  createActionCreator,
  createActionsForAsyncAction
} from "@/helpers/redux";

export const actionKeys = {
  GET_MOVIES: "GET_MOVIES",
  GET_GENRES: "GET_GENRES"
};

const actions = {
  getMovies: (page, filter) =>
    createActionCreator(actionKeys.GET_MOVIES, { page, filter }),
  getGenres: () => createActionCreator(actionKeys.GET_GENRES)
};

export const asyncActionMaps = {
  [actionKeys.GET_MOVIES]: createActionsForAsyncAction(actionKeys.GET_MOVIES),
  [actionKeys.GET_GENRES]: createActionsForAsyncAction(actionKeys.GET_GENRES)
};

export default actions;

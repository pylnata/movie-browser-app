import { createActionCreator, createActionsForAsyncAction } from "@/helpers/redux";

export const actionKeys = {
  GET_MOVIE: "GET_MOVIE",
  GET_ACTORS: "GET_ACTORS",
  GET_IMAGES: "GET_IMAGES",
  GET_RECCOMENDATIONS: "GET_RECOMMENDATIONS"
};

const actions = {
  getMovie: id => createActionCreator(actionKeys.GET_MOVIE, { id }),
  getActors: id =>
    createActionCreator(actionKeys.GET_ACTORS, { id }),
  getImages: id =>
    createActionCreator(actionKeys.GET_IMAGES, { id }),
  getRecommendations: id =>
    createActionCreator(actionKeys.GET_RECCOMENDATIONS, { id })
}

export const asyncActionMaps = {
  [actionKeys.GET_MOVIE]: createActionsForAsyncAction(actionKeys.GET_MOVIE),
  [actionKeys.GET_ACTORS]: createActionsForAsyncAction(actionKeys.GET_ACTORS),
  [actionKeys.GET_IMAGES]: createActionsForAsyncAction(actionKeys.GET_IMAGES),
  [actionKeys.GET_RECCOMENDATIONS]: createActionsForAsyncAction(
    actionKeys.GET_RECCOMENDATIONS
  )
};

export default actions;

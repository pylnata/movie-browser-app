import { put, takeEvery, all } from "redux-saga/effects";
import { actionKeys, asyncActionMaps } from "./actions";
import * as apiMovies from "@/api/apiMovies";

// watch
export function* watchMovie() {
  yield all([
    takeEvery(actionKeys.GET_MOVIE, getMovieSaga),
    takeEvery(actionKeys.GET_ACTORS, getActorsSaga),
    takeEvery(actionKeys.GET_IMAGES, getImagesSaga),
    takeEvery(actionKeys.GET_RECCOMENDATIONS, getRecommendationsSaga),
  ]);
}

// sagas
function* getMovieSaga(action) {
  const actions = asyncActionMaps[action.type];
  yield put(actions.start());
  try {
    const response = yield apiMovies.getMovie(action.id);
    yield put(actions.success(response.data));
  } catch (error) {
    yield put(actions.fail(error));
  }
}

function* getActorsSaga(action) {
  const actions = asyncActionMaps[action.type];
  yield put(actions.start());
  try {
    const response = yield apiMovies.getActors(action.id);
    yield put(actions.success(response.data.cast));
  } catch (error) {
    yield put(actions.fail(error));
  }
}

function* getImagesSaga(action) {
  const actions = asyncActionMaps[action.type];
  yield put(actions.start());
  try {
    const response = yield apiMovies.getMovieImages(action.id);
    yield put(actions.success(response.data.backdrops));
  } catch (error) {
    yield put(actions.fail(error));
  }
}

function* getRecommendationsSaga(action) {
  const actions = asyncActionMaps[action.type];
  yield put(actions.start());
  try {
    const response = yield apiMovies.getRecommendations(action.id);
    yield put(actions.success(response.data.results));
  } catch (error) {
    yield put(actions.fail(error));
  }
}

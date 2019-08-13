import { put, takeEvery, all } from "redux-saga/effects";
import { actionKeys, asyncActionMaps } from "./actions";
import * as apiMovies from "@/api/apiMovies";

// watch
export function* watchMovieBrowser() {
  yield all([
    takeEvery(actionKeys.GET_MOVIES, getMoviesSaga),
    takeEvery(actionKeys.GET_GENRES, getGenresSaga),
  ]);
}

// sagas
function* getMoviesSaga(action) {
  const actions = asyncActionMaps[action.type];
  const requestData = {
    page: action.page,
    filter: action.filter
  };
  yield put(actions.start(requestData));
  try {
    const response = yield apiMovies.getMovies(requestData);
    yield put(actions.success(response.data));
  } catch (error) {
    yield put(actions.fail(error));
  }
}

function* getGenresSaga(action) {
  const actions = asyncActionMaps[action.type];
  yield put(actions.start());
  try {
    const response = yield apiMovies.getGenres();
    yield put(actions.success(response.data.genres));
  } catch (error) {
    yield put(actions.fail(error));
  }
}

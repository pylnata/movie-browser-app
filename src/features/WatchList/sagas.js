import { put, all, takeEvery, delay } from "redux-saga/effects";
import * as apiFirebase from "@/api/apiFirebase";
import { actionKeys, asyncActionMaps } from "./actions";

import authActions from "@/features/Auth/actions";

// watch

export function* watchWatchList() {
  yield all([
    takeEvery(actionKeys.ADD_MOVIE_WATCHLIST, addMovieWatchListSaga),
    takeEvery(actionKeys.REMOVE_MOVIE_WATCHLIST, removeMovieWatchListSaga),
    takeEvery(actionKeys.GET_WATCHLIST, getWatchListSaga)
  ]);
}

//sagas
function* addMovieWatchListSaga(action) {
  const actions = asyncActionMaps[action.type];
  yield put(actions.start());

  const watchData = {
    movieId: action.data.id,
    userId: action.userId,
    value: action.data
  };
  try {
    yield apiFirebase.addMovieWatchList(action.token, watchData);
    yield put(actions.success(action.data));
  } catch (error) {
    yield put(actions.fail(error));
    yield handleError(error);
  }
}

function* removeMovieWatchListSaga(action) {
  const actions = asyncActionMaps[action.type];
  yield put(actions.start());

  const watchData = {
    movieId: action.movieId,
    userId: action.userId
  };

  try {
    yield apiFirebase.removeMovieWatchList(action.token, watchData);
    yield put(actions.success({ movieId: action.movieId }));
  } catch (error) {
    yield put(actions.fail(error.message));
    yield handleError(error);
  }
}

function* getWatchListSaga(action) {
  const actions = asyncActionMaps[action.type];
  yield put(actions.start());
  try {
    const response = yield apiFirebase.getWatchList(
      action.token,
      action.userId
    );
    yield put(actions.success(response.data));
  } catch (error) {
    yield put(actions.fail(error.message));
    yield handleError(error);
  }
}

function* handleError(error) {
  if (error.response.status === 401) {
    yield delay(2000);
    yield put(authActions.logout());
  }
}

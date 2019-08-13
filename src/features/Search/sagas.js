import { put, throttle } from "redux-saga/effects";
import { actionKeys, asyncActionMaps } from "./actions";
import * as apiMovies from "@/api/apiMovies";

// watch
export function* watchSearch() {
  yield throttle(1000, actionKeys.SEARCH_MOVIES, searchMoviesSaga);
}

// sagas
function* searchMoviesSaga(action) {
  const actions = asyncActionMaps[action.type];
  const requestData = {
    query: action.query,
    page: action.page
  };
  yield put(actions.start(requestData));

  console.log("search");

  try {
    const response = yield apiMovies.searchMovies(requestData);
    yield put(actions.success(response.data));
  } catch (error) {
    yield put(actions.fail(error));
  }
}

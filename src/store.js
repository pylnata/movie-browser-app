import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";

// reducers
import { authReducer } from "@/features/Auth/reducers";
import { movieBrowserReducer } from "@/features/MovieBrowser/reducers";
import { movieReducer } from "@/features/Movie/reducers";
import { watchListReducer } from "@/features/WatchList/reducers";
import { searchReducer } from "@/features/Search/reducers";

// sagas
import { watchAuth } from "@/features/Auth/sagas";
import { watchMovieBrowser } from "@/features/MovieBrowser/sagas";
import { watchSearch } from "@/features/Search/sagas";
import { watchMovie } from "@/features/Movie/sagas";
import { watchWatchList } from "@/features/WatchList/sagas";

const appReducer = combineReducers({
  auth: authReducer,
  movieBrowser: movieBrowserReducer,
  search: searchReducer,
  movieDetails: movieReducer,
  watchList: watchListReducer
});

const rootReducer = (state, action) => {
  if (action.type === "AUTH_LOGOUT_SUCCESS") {
    state = undefined;
  }
  return appReducer(state, action);
};

const sagaMiddleware = createSagaMiddleware();

let middlewares = [applyMiddleware(sagaMiddleware)];

if (process.env.NODE_ENV === "development") {
  middlewares = [
    applyMiddleware(sagaMiddleware),
    (window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()) ||
      (args => args)
  ];
}

const store = createStore(rootReducer, compose(...middlewares));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchMovieBrowser);
sagaMiddleware.run(watchSearch);
sagaMiddleware.run(watchMovie);
sagaMiddleware.run(watchWatchList);

export { store };

import { actionKeys } from "./actions";
import { createAsyncReducerMap, createReducer } from "@/helpers/redux";

const initialState = {
  isLoading: false,
  error: null,
  data: undefined
};

const onAddMovieSuccess = (state, action) => {
  const existedMovies = state.data ? state.data : [];
  return {
    ...state,
    data: [...existedMovies, action.data]
  }
}

const onRemoveMovieSuccess = (state, action) => {
  return {
    ...state,
    data: state.data.filter(item => item.id !== action.data.movieId)
  }
}

const onGetWatchlistSuccess = (state, action) => {
  return {
    ...state,
    data: action.data ? Object.values(action.data) : []
  }
};

const actionKeyHandlerFuncs = {
  ...createAsyncReducerMap(actionKeys.ADD_MOVIE_WATCHLIST, {
    [`${actionKeys.ADD_MOVIE_WATCHLIST}_SUCCESS`]: onAddMovieSuccess
  }),
  ...createAsyncReducerMap(actionKeys.REMOVE_MOVIE_WATCHLIST, {
    [`${actionKeys.REMOVE_MOVIE_WATCHLIST}_SUCCESS`]: onRemoveMovieSuccess
  }),
  ...createAsyncReducerMap(actionKeys.GET_WATCHLIST, {
    [`${actionKeys.GET_WATCHLIST}_SUCCESS`]: onGetWatchlistSuccess
  })
};

const watchListReducer = createReducer(initialState, actionKeyHandlerFuncs);

export { watchListReducer };

import { actionKeys } from "./actions";
import { combineReducers } from "redux";
import { createAsyncReducer, } from "@/helpers/redux";

const movieBrowserReducer = combineReducers({
  movies: createAsyncReducer(actionKeys.GET_MOVIES),
  genres: createAsyncReducer(actionKeys.GET_GENRES)
});

export { movieBrowserReducer };

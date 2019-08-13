import { actionKeys } from "./actions";
import { combineReducers } from "redux";
import { createAsyncReducer } from "@/helpers/redux";

const movieReducer = combineReducers({
  movie: createAsyncReducer(actionKeys.GET_MOVIE),
  actors: createAsyncReducer(actionKeys.GET_ACTORS),
  images: createAsyncReducer(actionKeys.GET_IMAGES),
  recommendations: createAsyncReducer(actionKeys.GET_RECCOMENDATIONS),
});

export { movieReducer };

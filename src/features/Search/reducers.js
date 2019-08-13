import { combineReducers } from "redux";
import { actionKeys } from "./actions";
import { createAsyncReducer } from "@/helpers/redux";

const searchReducer = combineReducers({
  results: createAsyncReducer(actionKeys.SEARCH_MOVIES),
  searchText: (state = "", action) => {
    switch (action.type) {
      case actionKeys.SET_SEARCH_TEXT:
        return action.text;
      default:
        return state;
    }
  }
});

export { searchReducer };

import { actionKeys } from "./actions";
import { createAsyncReducerMap, createReducer } from "@/helpers/redux";

const initialState = {
  isLoading: true, //because we try auto signup on app start
  error: null,
  data: {
    token: null,
    userId: null
  }
};

const actionKeyHandlerFuncs = {
  ...createAsyncReducerMap(actionKeys.AUTH_USER),
  ...createAsyncReducerMap(actionKeys.AUTH_LOGOUT)
};

const authReducer = createReducer(initialState, actionKeyHandlerFuncs);

export { authReducer };

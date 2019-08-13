import {
  createActionCreator,
  createActionsForAsyncAction
} from "@/helpers/redux";

export const actionKeys = {
  AUTH_CHECK_STATE: "AUTH_CHECK_STATE",
  AUTH_USER: "AUTH_USER",
  AUTH_LOGOUT: "AUTH_LOGOUT"
};

const actions = {
  auth: (email, password, isSignup) =>
    createActionCreator(actionKeys.AUTH_USER, { email, password, isSignup }),
  logout: () => createActionCreator(actionKeys.AUTH_LOGOUT),
  authCheckState: () => createActionCreator(actionKeys.AUTH_CHECK_STATE),
};

export const asyncActionMaps = {
  [actionKeys.AUTH_USER]: createActionsForAsyncAction(actionKeys.AUTH_USER),
  [actionKeys.AUTH_LOGOUT]: createActionsForAsyncAction(actionKeys.AUTH_LOGOUT)
};

export default actions;

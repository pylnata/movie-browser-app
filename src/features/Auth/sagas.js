import { put, call, all, takeEvery } from "redux-saga/effects";
import * as apiFirebase from "@/api/apiFirebase";
import authActions, { actionKeys, asyncActionMaps } from "./actions";

// watch

export function* watchAuth() {
  yield all([
    takeEvery(actionKeys.AUTH_LOGOUT, logoutSaga),
    takeEvery(actionKeys.AUTH_USER, authUserSaga),
    takeEvery(actionKeys.AUTH_CHECK_STATE, authCheckStateSaga)
  ]);
}

//sagas

// TODO REFRESH TOKEN BEFORE EXPIRED
function* checkAuthTimeoutSaga(action) {
  //yield delay(action.expirationTime * 1000);
  //yield put(authActions.logout());
}

function* authUserSaga(action) {
  const actions = asyncActionMaps[action.type];
  yield put(actions.start());

  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };

  try {
    let response = null;
    if (action.isSignup) {
      response = yield apiFirebase.signUp(authData);
    } else {
      response = yield apiFirebase.signIn(authData);
    }

    const expirationDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", response.data.localId);

    yield put(
      actions.success({
        token: response.data.idToken,
        userId: response.data.localId
      })
    );
    yield checkAuthTimeoutSaga(response.data.expiresIn);
  } catch (error) {
    yield put(actions.fail(error.response.data.error));
  }
}

function* authCheckStateSaga(action) {
  yield put(asyncActionMaps["AUTH_USER"].start());
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(authActions.logout());
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem("expirationDate")
    );
    if (expirationDate <= new Date()) {
      yield put(authActions.logout());
    } else {
      const userId = yield localStorage.getItem("userId");
      try {
        const authData = { idToken: token };
        yield apiFirebase.getUser(authData);
        yield put(asyncActionMaps["AUTH_USER"].success({ token, userId }));
        yield checkAuthTimeoutSaga(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        );
      } catch (error) {
        yield put(authActions.logout());
      }
    }
  }
}

function* logoutSaga(action) {
  const actions = asyncActionMaps[action.type];
  yield call([localStorage, "removeItem"], "token");
  yield call([localStorage, "removeItem"], "expirationDate");
  yield call([localStorage, "removeItem"], "userId");
  yield put(actions.success({ token: null, userId: null }));
}

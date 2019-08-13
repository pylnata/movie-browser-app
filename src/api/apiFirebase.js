import { axiosFirebase as axios } from "../axios";

export const signUp = authData => {
  return axios.post(
    "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser",
    authData
  );
};

export const signIn = authData => {
  return axios.post(
    "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword",
    authData
  );
};

export const getUser = authData => {
  return axios.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:lookup",
    authData
  );
};


export const addMovieWatchList = (token, data) => {
  return axios.put(
    "/watchlist/" + data.userId + "/" + data.movieId + ".json?auth=" + token,
    data.value
  );
};

export const removeMovieWatchList = (token, data) => {
  return axios.delete(
    "/watchlist/" + data.userId + "/" + data.movieId + ".json?auth=" + token
  );
};

export const getWatchList = (token, userId) => {
 return axios.get("/watchlist/" + userId + ".json?auth=" + token);
};

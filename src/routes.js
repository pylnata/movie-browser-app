import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import PrivateRoute from "@/hoc/PrivateRoute";
import { MovieBrowser, Logout } from "@/features";

const Movie = React.lazy(() => {
  return import("./features/Movie/Movie");
});

const Auth = React.lazy(() => {
  return import("./features/Auth/Auth");
});

const WatchList = React.lazy(() => {
  return import("./features/WatchList/WatchList");
});

const Search = React.lazy(() => {
  return import("./features/Search/Search");
});

const Routes = props => (
  <Switch>
    <Route path="/auth" exact component={Auth} />
    <Route path="/logout" exact component={Logout} />
    <Route path="/movie/:movie_id(\d+)" exact component={Movie} />
    <PrivateRoute
      path="/watchlist"
      exact
      component={WatchList}
      isAuthenticated={props.isAuthenticated}
    />
    <Route
      path="/search/:query/:page(\d+)?"
      exact
      component={Search}
    />
    <Route
      path="/:filter(popular|top_rated|upcoming|now_playing)?/:page(\d+)?"
      exact
      component={MovieBrowser}
    />
    <Redirect to="/" />
  </Switch>
);

export default Routes;

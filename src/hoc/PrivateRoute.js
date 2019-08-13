import React from "react";
import { Route, Redirect } from "react-router-dom";
//import { connect } from "react-redux";

const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => {

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          //localStorage.token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};
/*
const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.data.token !== null
});

const connectedPrivateRoute = connect(mapStateToProps)(PrivateRoute);

export default connectedPrivateRoute;
*/

export default PrivateRoute;

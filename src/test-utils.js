import React from "react";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router, Route } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";

export function renderWithRouterMatchAndRedux(
  Component,
  {
    path = "/",
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>
          <Route path={path}>{props => <Component {...props} />}</Route>
        </Router>
      </Provider>
    )
  };
}

import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { createMemoryHistory } from "history";
import { Router, Route } from "react-router-dom";
import MovieFilter from "../MovieFilter";

it("only button for selected filter from match.params.filter has class btn-success", () => {
  ["popular", "now_playing", "top_rated", "upcoming"].forEach(filter => {
    cleanup();
    const { container, getByTitle } = renderWithRouterMatch(MovieFilter, {
      route: "/" + filter,
      path: "/:filter"
    });
    expect(getByTitle(filter).classList.contains("btn-success")).toBeTruthy();
    expect(container.getElementsByClassName("btn-success").length).toBe(1);
  });
});

function renderWithRouterMatch(
  ui,
  {
    path = "/",
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  return {
    ...render(
      <Router history={history}>
        <Route path={path} component={ui} />
      </Router>
    )
  };
}

import React from "react";
import { wait } from "@testing-library/react";
import mockAxios from "axios";

import { renderWithRouterMatchAndRedux } from "../../../test-utils";
import MovieBrowser from "../MovieBrowser";
import { movies, genres } from "../../../__mocks__/fakeResponse"

jest.mock("../../../hoc/WithHttpErrorHandler", () => Component => props => (
  <Component {...props} />
));

describe("MovieBrowser", () => {
  it("MovieBrowser shows movies according to selected filter", async () => {
    mockAxios.get.mockImplementation(url => {
      switch (url) {
        case "/genre/movie/list":
          return Promise.resolve({ data: genres });
        case "/movie/popular":
          return Promise.resolve({ data: movies });
        default:
          return Promise.reject({ error: "No url" });
      }
    });

    const { container } = renderWithRouterMatchAndRedux(MovieBrowser, {
      route: "/",
      path: "/"
    });
    expect(container.innerHTML.match("Loading")).toBeTruthy();

    await wait(() => {
      expect(
        container.getElementsByClassName("movie-card").length
      ).toBeGreaterThan(0);
    });
  });
});

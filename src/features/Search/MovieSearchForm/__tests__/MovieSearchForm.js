import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { createMemoryHistory } from "history";

import { MovieSearchForm } from "../MovieSearchForm";

afterEach(cleanup);

describe("MovieSearchForm", () => {
  it("relocates to page with search results for user input", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const setSearchText = jest.fn();
    const { getByTestId } = render(
      <MovieSearchForm setSearchText={setSearchText} history={history} />
    );
    const query = "titanic";
    const input = getByTestId("search-input");
    fireEvent.change(input, { target: { value: query } });
    expect(history.location.pathname).toBe("/search/" + query);
    expect(setSearchText).toHaveBeenCalled();
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <MovieSearchForm setSearchText={jest.fn()} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

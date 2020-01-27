import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { wait } from "@testing-library/react";
import { Auth } from "../Auth";

describe("Auth", () => {
  test("renders form with testid=login-form", () => {
    const { getByTestId } = render(<Auth onAuth={jest.fn()} />);
    expect(getByTestId("login-form")).toBeInTheDocument();
  });

  test("dispatch action onAuth on submit form with correct values ", async () => {
    const onAuth = jest.fn();

    const { getByTestId } = render(<Auth onAuth={onAuth} />);
    const form = getByTestId("login-form");
    const emailInput = form.querySelector("input[name=email]");
    const passwordInput = form.querySelector("input[name=password]");
    fireEvent.change(emailInput, {
      target: {
        value: "test@test.test"
      }
    });
    fireEvent.change(passwordInput, {
      target: {
        value: "password"
      }
    });
    expect(emailInput.value).toBe("test@test.test");
    expect(passwordInput.value).toBe("password");
    fireEvent.click(form.querySelector("button"));

    await wait(() => {
      expect(onAuth).toHaveBeenCalledTimes(1);
    });
  });
});

import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Signup from "./Signup";
import { createTestStore } from "../../app/store";

describe("Signup", () => {
  const store = createTestStore();

  it("should render correctly", () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Signup />
        </BrowserRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});

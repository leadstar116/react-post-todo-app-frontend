import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Homepage from "./Homepage";
import { createTestStore } from "../../app/store";

describe("Homepage", () => {
  const store = createTestStore();

  it("should render correctly", () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Homepage />
        </BrowserRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});

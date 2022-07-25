import { IAlertNewPayload, IAlertState } from "./alertInterface";
import alertReducer, { newAlert, clearAlert } from "./alertSlice";

describe("Alert Reducer", () => {
  const initialState: IAlertState = {
    message: "",
    type: "",
  };

  it("should handle initial state", () => {
    expect(alertReducer(undefined, {} as any)).toEqual(initialState);
  });

  it("should handle newAlert action", () => {
    const payload: IAlertNewPayload = {
      message: "test",
      type: "success",
    };
    const action = newAlert(payload);
    expect(alertReducer(initialState, action)).toEqual({
      message: "test",
      type: "success",
    });
  });

  it("should handle clearAlert action", () => {
    const action = clearAlert();
    expect(alertReducer(initialState, action)).toEqual(initialState);
  });
});

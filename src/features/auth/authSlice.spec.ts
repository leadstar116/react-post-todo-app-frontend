import { IAuthState } from "./authInterface";
import authReducer, { logout } from "./authSlice";

describe("Auth Reducer", () => {
  const initialState: IAuthState = {
    isLoggedIn: false,
    token: "",
  };

  it("should handle initial state", () => {
    expect(authReducer(undefined, {} as any)).toEqual(initialState);
  });

  it("should handle logout action", () => {
    const action = logout();
    expect(authReducer(initialState, action)).toEqual(initialState);
  });
});

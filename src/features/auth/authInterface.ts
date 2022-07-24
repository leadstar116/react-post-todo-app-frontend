export interface IAuthState {
  isLoggedIn: boolean;
  token: string;
  status: "idle" | "loading" | "failed" | "registering";
}

export interface IAuthParameters {
  email: string;
  password: string;
}

export interface IAuthResult {
  token?: string;
  message?: string;
}

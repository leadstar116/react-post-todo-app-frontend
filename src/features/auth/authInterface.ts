export interface IAuthState {
  isLoggedIn: boolean;
  token: string;
}

export interface IAuthParameters {
  email: string;
  password: string;
}

export interface IAuthResult {
  token?: string;
  message?: string;
}

import { api } from "./api";

export interface IUserCredentials {
  email: string;
  password: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<{ token: string }, any>({
      query: (credentials: IUserCredentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth", "Posts"],
    }),
    register: build.mutation<{ token: string }, any>({
      query: (credentials: IUserCredentials) => ({
        url: "auth/register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth", "Posts"],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;

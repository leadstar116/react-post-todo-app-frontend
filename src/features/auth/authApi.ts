import axios from "axios";
import { IAuthParameters, IAuthResult } from "./authInterface";

export async function loginApi(params: IAuthParameters): Promise<IAuthResult> {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      params
    );

    return response.data;
  } catch (e: any) {
    console.error("Login Error:", e);
    return { message: e.response?.data?.message || e.message };
  }
}

export async function registerApi(
  params: IAuthParameters
): Promise<IAuthResult> {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/register`,
      params
    );

    return response.data;
  } catch (e: any) {
    console.error("Register Error:", e);
    return { message: e.response?.data?.message || e.message };
  }
}

import apiInstance from "../apiInstance";
import type { LoginResponse } from "./types";

const authApis = {
  login: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<LoginResponse> => {
    const response = await apiInstance.post("/auth/login", { email, password });
    return response.data;
  },
};

export default authApis;

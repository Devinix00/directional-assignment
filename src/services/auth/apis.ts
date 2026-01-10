import apiInstance from "../apiInstance";
import type { LoginRequest, LoginResponse } from "./types";

const authApis = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiInstance.post("/auth/login", data);
    return response.data;
  },
};

export default authApis;

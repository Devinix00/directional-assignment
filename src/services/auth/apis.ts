import apiInstance from "../apiInstance";

const authApis = {
  login: async ({ email, password }: { email: string; password: string }) => {
    const response = await apiInstance.post("/auth/login", { email, password });
    return response.data;
  },
};

export default authApis;

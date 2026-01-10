import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { message } from "antd";
import useAuthStore from "../stores/useAuthStore";
import PATH from "../router/path";

const apiInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

apiInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    console.error(error);
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    const errorMessage =
      (error.response?.data as { message: string }).message || error.message;

    if (errorMessage) {
      message.error(errorMessage);
    }

    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.replace(PATH.LOGIN);
    }

    return Promise.reject(error);
  }
);

export default apiInstance;

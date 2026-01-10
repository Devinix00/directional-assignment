import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { message } from "antd";

const apiInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

apiInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
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

    return Promise.reject(error);
  }
);

export default apiInstance;

import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

const apiInstance: AxiosInstance = axios.create({
  baseURL: "",
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
    console.error(error);
    return Promise.reject(error);
  }
);

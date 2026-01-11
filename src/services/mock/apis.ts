import apiInstance from "../apiInstance";
import type {
  WeeklyMoodTrendResponse,
  PopularSnackBrandsResponse,
  WeeklyWorkoutTrendResponse,
  CoffeeConsumptionResponse,
  SnackImpactResponse,
} from "./types";

const mockApis = {
  getWeeklyMoodTrend: async (): Promise<WeeklyMoodTrendResponse> => {
    const response = await apiInstance.get("/mock/weekly-mood-trend");
    return response.data;
  },
  getPopularSnackBrands: async (): Promise<PopularSnackBrandsResponse> => {
    const response = await apiInstance.get("/mock/popular-snack-brands");
    return response.data;
  },
  getWeeklyWorkoutTrend: async (): Promise<WeeklyWorkoutTrendResponse> => {
    const response = await apiInstance.get("/mock/weekly-workout-trend");
    return response.data;
  },
  getCoffeeConsumption: async (): Promise<CoffeeConsumptionResponse> => {
    const response = await apiInstance.get("/mock/coffee-consumption");
    return response.data;
  },
  getSnackImpact: async (): Promise<SnackImpactResponse> => {
    const response = await apiInstance.get("/mock/snack-impact");
    return response.data;
  },
};

export default mockApis;

import { useQuery } from "@tanstack/react-query";
import mockApis from "./apis";

export function useGetWeeklyMoodTrendQuery({
  queryKey,
}: {
  queryKey: readonly unknown[];
}) {
  return useQuery({
    queryKey,
    queryFn: () => mockApis.getWeeklyMoodTrend(),
  });
}

export function useGetPopularSnackBrandsQuery({
  queryKey,
}: {
  queryKey: readonly unknown[];
}) {
  return useQuery({
    queryKey,
    queryFn: () => mockApis.getPopularSnackBrands(),
  });
}

export function useGetWeeklyWorkoutTrendQuery({
  queryKey,
}: {
  queryKey: readonly unknown[];
}) {
  return useQuery({
    queryKey,
    queryFn: () => mockApis.getWeeklyWorkoutTrend(),
  });
}

export function useGetCoffeeConsumptionQuery({
  queryKey,
}: {
  queryKey: readonly unknown[];
}) {
  return useQuery({
    queryKey,
    queryFn: () => mockApis.getCoffeeConsumption(),
  });
}

export function useGetSnackImpactQuery({
  queryKey,
}: {
  queryKey: readonly unknown[];
}) {
  return useQuery({
    queryKey,
    queryFn: () => mockApis.getSnackImpact(),
  });
}

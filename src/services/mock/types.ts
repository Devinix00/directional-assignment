export interface WeeklyMoodTrendItem {
  week: string;
  happy: number;
  tired: number;
  stressed: number;
}

export type WeeklyMoodTrendResponse = WeeklyMoodTrendItem[];

export interface PopularSnackBrandItem {
  name: string;
  share: number;
}

export type PopularSnackBrandsResponse = PopularSnackBrandItem[];

export interface WeeklyWorkoutTrendItem {
  week: string;
  running: number;
  cycling: number;
  stretching: number;
}

export type WeeklyWorkoutTrendResponse = WeeklyWorkoutTrendItem[];

export interface CoffeeConsumptionSeriesItem {
  cups: number;
  bugs: number;
  productivity: number;
}

export interface CoffeeConsumptionTeam {
  team: string;
  series: CoffeeConsumptionSeriesItem[];
}

export interface CoffeeConsumptionResponse {
  teams: CoffeeConsumptionTeam[];
}

export interface SnackImpactMetric {
  snacks: number;
  meetingsMissed: number;
  morale: number;
}

export interface SnackImpactDepartment {
  name: string;
  metrics: SnackImpactMetric[];
}

export interface SnackImpactResponse {
  departments: SnackImpactDepartment[];
}

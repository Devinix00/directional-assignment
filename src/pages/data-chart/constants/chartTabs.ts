export const CHART_TAB_ITEMS = [
  {
    key: "weekly-mood-trend",
    label: "주간 무드 트렌드",
  },
  {
    key: "popular-snack-brands",
    label: "인기 간식 브랜드",
  },
  {
    key: "weekly-workout-trend",
    label: "주간 운동 트렌드",
  },
  {
    key: "coffee-consumption",
    label: "커피 소비량",
  },
  {
    key: "snack-impact",
    label: "간식 영향",
  },
];

export type ChartTabKey = (typeof CHART_TAB_ITEMS)[number]["key"];

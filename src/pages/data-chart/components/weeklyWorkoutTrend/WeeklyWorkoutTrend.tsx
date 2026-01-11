import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ChartLegend from "../../../../components/chartLegend/ChartLegend";
import { useChartLegend } from "../../../../hooks/useChartLegend";
import { useGetWeeklyWorkoutTrendQuery } from "../../../../services/mock/queries";
import mockQueryKeys from "../../../../services/mock/queryKeys";
import INITIAL_WEEKLY_WORKOUT_TREND_LEGEND_ITEMS from "./constants/initialWeeklyWorkoutTrendLegend";
import styles from "./WeeklyWorkoutTrend.module.scss";

export default function WeeklyWorkoutTrend() {
  const { data, isLoading } = useGetWeeklyWorkoutTrendQuery({
    queryKey: mockQueryKeys.weeklyWorkoutTrend(),
  });

  const {
    legendItems,
    colorMap,
    visibleLegendItems,
    handleColorChange,
    handleVisibilityChange,
  } = useChartLegend(INITIAL_WEEKLY_WORKOUT_TREND_LEGEND_ITEMS);

  if (isLoading || !data || data.length === 0) return null;

  return (
    <div className={styles.container}>
      <ChartLegend
        items={legendItems}
        onColorChange={handleColorChange}
        onVisibilityChange={handleVisibilityChange}
      />
      <div className={styles.charts}>
        <div className={styles.chart_item}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis tickFormatter={(value) => `${value}%`} />
              <Tooltip />
              {visibleLegendItems.map((item) => (
                <Bar
                  key={item.name}
                  dataKey={item.name}
                  stackId="workout"
                  fill={colorMap[item.name] || "#888888"}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.chart_item}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis tickFormatter={(value) => `${value}%`} />
              <Tooltip />
              {visibleLegendItems.map((item) => (
                <Area
                  key={item.name}
                  type="monotone"
                  dataKey={item.name}
                  stackId="workout"
                  fill={colorMap[item.name] || "#888888"}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

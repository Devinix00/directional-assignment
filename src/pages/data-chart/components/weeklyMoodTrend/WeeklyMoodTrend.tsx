import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useMemo } from "react";
import ChartLegend from "../../../../components/chartLegend/ChartLegend";
import { useChartLegend } from "../../../../hooks/useChartLegend";
import { useGetWeeklyMoodTrendQuery } from "../../../../services/mock/queries";
import mockQueryKeys from "../../../../services/mock/queryKeys";
import INITIAL_WEEKLY_MOOD_TREND_LEGEND_ITEMS from "./constants/initialWeeklyMoodTrendLegend";
import styles from "./WeeklyMoodTrend.module.scss";

export default function WeeklyMoodTrend() {
  const { data, isLoading } = useGetWeeklyMoodTrendQuery({
    queryKey: mockQueryKeys.weeklyMoodTrend(),
  });

  const {
    legendItems,
    colorMap,
    visibleLegendItems,
    handleColorChange,
    handleVisibilityChange,
  } = useChartLegend(INITIAL_WEEKLY_MOOD_TREND_LEGEND_ITEMS);

  const donutChartData = useMemo(() => {
    if (!data) return [];
    return visibleLegendItems.map((item) => {
      const total = data.reduce(
        (sum, week) =>
          sum + ((week[item.label as keyof typeof week] as number) || 0),
        0
      );
      return {
        name: item.label,
        value: total,
        fill: colorMap[item.label] || "#888888",
      };
    });
  }, [data, visibleLegendItems, colorMap]);

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
                  key={item.label}
                  dataKey={item.label}
                  stackId="mood"
                  fill={colorMap[item.label] || "#888888"}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.chart_item}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={donutChartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                dataKey="value"
                label={({ name, value }: { name?: string; value?: number }) =>
                  `${name || ""}: ${value || 0}`
                }
              >
                {donutChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
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
                  key={item.label}
                  type="monotone"
                  dataKey={item.label}
                  stackId="mood"
                  fill={colorMap[item.label] || "#888888"}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

import { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ChartLegend from "../../../../components/chartLegend/ChartLegend";
import { useChartLegend } from "../../../../hooks/useChartLegend";
import { useGetSnackImpactQuery } from "../../../../services/mock/queries";
import mockQueryKeys from "../../../../services/mock/queryKeys";
import styles from "./SnackImpact.module.scss";
import INITIAL_SNACK_IMPACT_LEGEND_ITEMS from "./constants/initialSnackImpactLegend";

export default function SnackImpact() {
  const { data, isLoading } = useGetSnackImpactQuery({
    queryKey: mockQueryKeys.snackImpact(),
  });

  const {
    legendItems,
    colorMap,
    visibleLegendItems,
    handleColorChange,
    handleVisibilityChange,
  } = useChartLegend(INITIAL_SNACK_IMPACT_LEGEND_ITEMS);

  const chartData = useMemo(() => {
    if (!data?.departments) return [];

    const snacks = [
      ...new Set(
        data.departments.flatMap((dept) => dept.metrics.map((m) => m.snacks))
      ),
    ].sort((a, b) => a - b);

    return snacks.map((snack) => {
      const point: Record<string, number | string> = { snacks: snack };
      data.departments.forEach((department) => {
        const item = department.metrics.find((m) => m.snacks === snack);
        if (item) {
          point[`${department.name}_meetingsMissed`] = item.meetingsMissed;
          point[`${department.name}_morale`] = item.morale;
        }
      });
      return point;
    });
  }, [data]);

  console.log("visibleLegendItems", visibleLegendItems);

  if (isLoading || !data || !data.departments || data.departments.length === 0)
    return null;

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
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="snacks"
                allowDuplicatedCategory={false}
                label={{
                  value: "스낵 수",
                  position: "insideBottom",
                  offset: -2.5,
                }}
              />
              <YAxis
                yAxisId="left"
                label={{
                  value: "회의불참",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                label={{
                  value: "사기",
                  angle: 90,
                  position: "insideRight",
                }}
              />
              <Tooltip shared={false} trigger="hover" />
              {visibleLegendItems.map((item) => {
                const isMeetingsMissed = item.name.endsWith("_meetingsMissed");
                const isMorale = item.name.endsWith("_morale");
                const department = item.name.replace(
                  /_meetingsMissed$|_morale$/,
                  ""
                );

                if (isMeetingsMissed) {
                  return (
                    <Line
                      key={item.name}
                      yAxisId="left"
                      type="monotone"
                      dataKey={item.name}
                      stroke={colorMap[item.name] || "#888888"}
                      strokeWidth={2}
                      dot={{ r: 4, fill: colorMap[item.name] || "#888888" }}
                      name={`${department} (회의불참)`}
                    />
                  );
                }

                if (isMorale) {
                  return (
                    <Line
                      key={item.name}
                      yAxisId="right"
                      type="monotone"
                      dataKey={item.name}
                      stroke={colorMap[item.name] || "#888888"}
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={({ cx, cy }) =>
                        cx &&
                        cy && (
                          <rect
                            x={cx - 4}
                            y={cy - 4}
                            width={8}
                            height={8}
                            fill={colorMap[item.name] || "#888888"}
                            stroke={colorMap[item.name] || "#888888"}
                            strokeWidth={1}
                          />
                        )
                      }
                      name={`${department} (사기)`}
                    />
                  );
                }
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

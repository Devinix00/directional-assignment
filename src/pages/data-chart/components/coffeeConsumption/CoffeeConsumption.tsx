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
import { useGetCoffeeConsumptionQuery } from "../../../../services/mock/queries";
import mockQueryKeys from "../../../../services/mock/queryKeys";
import styles from "./CoffeeConsumption.module.scss";
import INITIAL_COFFEE_CONSUMPTION_LEGEND_ITEMS from "./constants/initialCoffeeConsumptionLegend";

export default function CoffeeConsumption() {
  const { data, isLoading } = useGetCoffeeConsumptionQuery({
    queryKey: mockQueryKeys.coffeeConsumption(),
  });

  const {
    legendItems,
    colorMap,
    visibleLegendItems,
    handleColorChange,
    handleVisibilityChange,
  } = useChartLegend(INITIAL_COFFEE_CONSUMPTION_LEGEND_ITEMS);

  const chartData = useMemo(() => {
    if (!data?.teams) return [];

    const cups = [
      ...new Set(data.teams.flatMap((team) => team.series.map((s) => s.cups))),
    ].sort((a, b) => a - b);

    return cups.map((cup) => {
      const point: Record<string, number | string> = { cups: cup };
      data.teams.forEach((team) => {
        const item = team.series.find((s) => s.cups === cup);
        if (item) {
          point[`${team.team}_bugs`] = item.bugs;
          point[`${team.team}_productivity`] = item.productivity;
        }
      });
      return point;
    });
  }, [data]);

  if (isLoading || !data || !data.teams || data.teams.length === 0) return null;

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
                dataKey="cups"
                allowDuplicatedCategory={false}
                label={{
                  value: "커피 섭취량 (잔/일)",
                  position: "insideBottom",
                  offset: -2.5,
                }}
              />
              <YAxis
                yAxisId="left"
                label={{ value: "버그 수", angle: -90, position: "insideLeft" }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                label={{
                  value: "생산성 점수",
                  angle: 90,
                  position: "insideRight",
                }}
              />
              <Tooltip shared={false} trigger="hover" />
              {visibleLegendItems.map((item) => {
                const isBugs = item.name.endsWith("_bugs");
                const isProductivity = item.name.endsWith("_productivity");
                const team = item.name.replace(/_bugs$|_productivity$/, "");

                if (isBugs) {
                  return (
                    <Line
                      key={item.name}
                      yAxisId="left"
                      type="monotone"
                      dataKey={item.name}
                      stroke={colorMap[item.name] || "#888888"}
                      strokeWidth={2}
                      dot={{ r: 4, fill: colorMap[item.name] || "#888888" }}
                      name={`${team} (버그)`}
                    />
                  );
                }

                if (isProductivity) {
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
                      name={`${team} (생산성)`}
                    />
                  );
                }

                return null;
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

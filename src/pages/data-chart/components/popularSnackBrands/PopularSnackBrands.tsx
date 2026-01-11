import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useMemo } from "react";
import ChartLegend from "../../../../components/chartLegend/ChartLegend";
import { useChartLegend } from "../../../../hooks/useChartLegend";
import { useGetPopularSnackBrandsQuery } from "../../../../services/mock/queries";
import mockQueryKeys from "../../../../services/mock/queryKeys";
import INITIAL_POPULAR_SNACK_BRANDS_LEGEND_ITEMS from "./constants/initialPopularSnackBrandsLegend";
import styles from "./PopularSnackBrands.module.scss";

function PopularSnackBrands() {
  const { data, isLoading } = useGetPopularSnackBrandsQuery({
    queryKey: mockQueryKeys.popularSnackBrands(),
  });

  const {
    legendItems,
    colorMap,
    visibleLegendItems,
    handleColorChange,
    handleVisibilityChange,
  } = useChartLegend(INITIAL_POPULAR_SNACK_BRANDS_LEGEND_ITEMS);

  const chartData = useMemo(() => {
    if (!data) return [];
    return visibleLegendItems.map((item) => {
      const dataItem = data.find((d) => d.name === item.label);
      return {
        name: item.label,
        value: dataItem?.share || 0,
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
      <div className={styles.chart_container}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }: { name?: string; percent?: number }) =>
                `${name || ""}: ${percent ? (percent * 100).toFixed(0) : 0}%`
              }
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PopularSnackBrands;

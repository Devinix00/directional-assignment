import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
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
      <div className={styles.charts}>
        <div className={styles.chart_item}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.chart_item}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                dataKey="value"
                label={({ name, value }: { name?: string; value?: number }) =>
                  `${name || ""}: ${value || 0}`
                }
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default PopularSnackBrands;

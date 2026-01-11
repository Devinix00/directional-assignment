import { Column } from "@ant-design/plots";
import { useMemo, useState } from "react";
import ChartLegend, {
  type ChartLegendItem,
} from "../../../../components/chartLegend/ChartLegend";
import { useGetWeeklyMoodTrendQuery } from "../../../../services/mock/queries";
import mockQueryKeys from "../../../../services/mock/queryKeys";
import INITIAL_WEEKLY_MOOD_TREND_LEGEND_ITEMS from "./constants/initialWeeklyMoodTrendLegend";

export default function WeeklyMoodTrend() {
  const { data, isLoading } = useGetWeeklyMoodTrendQuery({
    queryKey: mockQueryKeys.weeklyMoodTrend(),
  });

  const [legendItems, setLegendItems] = useState<ChartLegendItem[]>(
    INITIAL_WEEKLY_MOOD_TREND_LEGEND_ITEMS
  );

  const visibleTypes = useMemo(
    () => legendItems.filter((item) => item.visible).map((item) => item.label),
    [legendItems]
  );

  const chartData = useMemo(
    () =>
      data
        ?.flatMap((item) => [
          { week: item.week, type: "happy", value: item.happy },
          { week: item.week, type: "tired", value: item.tired },
          { week: item.week, type: "stressed", value: item.stressed },
        ])
        .filter((item) => visibleTypes.includes(item.type)) || [],
    [data, visibleTypes]
  );

  console.log("chartData", chartData);
  console.log("legendItems", legendItems);

  const colorMap = useMemo(() => {
    return Object.fromEntries(
      legendItems.map((item) => [item.label, item.color])
    );
  }, [legendItems]);

  if (isLoading || !data) return null;

  const config = {
    data: chartData,
    xField: "week",
    yField: "value",
    seriesField: "type",
    isStack: true,
    style: {
      fill: (d: { type: string }) => colorMap[d.type] || "#888888",
    },
  };

  const handleColorChange = (label: string, color: string) => {
    setLegendItems((prev) =>
      prev.map((item) => (item.label === label ? { ...item, color } : item))
    );
  };

  const handleVisibilityChange = (label: string, visible: boolean) => {
    setLegendItems((prev) =>
      prev.map((item) => (item.label === label ? { ...item, visible } : item))
    );
  };

  return (
    <div>
      <ChartLegend
        items={legendItems}
        onColorChange={handleColorChange}
        onVisibilityChange={handleVisibilityChange}
      />
      <Column {...config} />
    </div>
  );
}

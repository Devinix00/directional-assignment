import { useMemo, useState } from "react";
import type { ChartLegendItem } from "../components/chartLegend/ChartLegend";

export function useChartLegend(initialItems: ChartLegendItem[]) {
  const [legendItems, setLegendItems] =
    useState<ChartLegendItem[]>(initialItems);

  const colorMap = useMemo(() => {
    return Object.fromEntries(
      legendItems.map((item) => [item.name, item.color])
    );
  }, [legendItems]);

  const visibleLegendItems = useMemo(
    () => legendItems.filter((item) => item.visible),
    [legendItems]
  );

  const handleColorChange = (name: string, color: string) => {
    setLegendItems((prev) =>
      prev.map((item) => (item.name === name ? { ...item, color } : item))
    );
  };

  const handleVisibilityChange = (name: string, visible: boolean) => {
    setLegendItems((prev) =>
      prev.map((item) => (item.name === name ? { ...item, visible } : item))
    );
  };

  return {
    legendItems,
    colorMap,
    visibleLegendItems,
    handleColorChange,
    handleVisibilityChange,
  };
}

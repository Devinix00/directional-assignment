import { useEffect, useMemo, useState } from "react";
import type { ChartLegendItem } from "../components/chartLegend/ChartLegend";

export function useChartLegend(initialItems: ChartLegendItem[]) {
  const [legendItems, setLegendItems] =
    useState<ChartLegendItem[]>(initialItems);

  useEffect(() => {
    setLegendItems(initialItems);
  }, [initialItems]);

  const nameGroups = useMemo(() => {
    return initialItems.reduce((acc, item) => {
      const groupName = item.name.split("_")[0];
      (acc[groupName] = acc[groupName] || []).push(item.name);
      return acc;
    }, {} as Record<string, string[]>);
  }, [initialItems]);

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
    const groupName = name.split("_")[0];
    const groupNames = nameGroups[groupName] || [];

    setLegendItems((prev) =>
      prev.map((item) =>
        groupNames.includes(item.name) ? { ...item, color } : item
      )
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

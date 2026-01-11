import { useEffect, useMemo, useState } from "react";
import type { ChartLegendItem } from "../components/chartLegend/ChartLegend";

export function useChartLegend(initialItems: ChartLegendItem[]) {
  const [legendItems, setLegendItems] =
    useState<ChartLegendItem[]>(initialItems);

  useEffect(() => {
    setLegendItems(initialItems);
  }, [initialItems]);

  const nameGroups = useMemo(() => {
    const groups = new Map<string, string[]>();
    initialItems.forEach((item) => {
      const groupName = item.name.split("_")[0];
      const names = groups.get(groupName) || [];
      groups.set(groupName, [...names, item.name]);
    });
    return groups;
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
    const groupNames = nameGroups.get(groupName) || [];

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

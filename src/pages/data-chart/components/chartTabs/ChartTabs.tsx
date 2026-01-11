import { Tabs } from "antd";
import styles from "./ChartTabs.module.scss";
import { CHART_TAB_ITEMS, type ChartTabKey } from "../../constants/chartTabs";

interface ChartTabsProps {
  activeKey: ChartTabKey;
  onChange: (key: ChartTabKey) => void;
}

export default function ChartTabs({ activeKey, onChange }: ChartTabsProps) {
  return (
    <Tabs
      activeKey={activeKey}
      items={CHART_TAB_ITEMS}
      onChange={(key) => onChange(key as ChartTabKey)}
      className={styles.tabs}
    />
  );
}

export type { ChartTabKey };

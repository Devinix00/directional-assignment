import { useState } from "react";
import ChartTabs, { type ChartTabKey } from "./components/chartTabs/ChartTabs";
import styles from "./DataChartPage.module.scss";
import WeeklyMoodTrend from "./components/weeklyMoodTrend/WeeklyMoodTrend";

function DataChartPage() {
  const [activeKey, setActiveKey] = useState<ChartTabKey>("weekly-mood-trend");

  const handleTabChange = (key: ChartTabKey) => {
    setActiveKey(key);
  };

  return (
    <div className={styles.container}>
      <ChartTabs activeKey={activeKey} onChange={handleTabChange} />

      {activeKey === "weekly-mood-trend" && <WeeklyMoodTrend />}
    </div>
  );
}

export default DataChartPage;

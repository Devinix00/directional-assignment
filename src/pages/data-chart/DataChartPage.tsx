import { useState } from "react";
import ChartTabs, { type ChartTabKey } from "./components/ChartTabs/ChartTabs";
import styles from "./DataChartPage.module.scss";

function DataChartPage() {
  const [activeKey, setActiveKey] = useState<ChartTabKey>("weekly-mood-trend");

  const handleTabChange = (key: ChartTabKey) => {
    setActiveKey(key);
  };

  return (
    <div className={styles.container}>
      <ChartTabs activeKey={activeKey} onChange={handleTabChange} />
    </div>
  );
}

export default DataChartPage;

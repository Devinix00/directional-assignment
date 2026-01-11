import { useState } from "react";
import ChartTabs, { type ChartTabKey } from "./components/chartTabs/ChartTabs";
import styles from "./DataChartPage.module.scss";
import WeeklyMoodTrend from "./components/weeklyMoodTrend/WeeklyMoodTrend";
import PopularSnackBrands from "./components/popularSnackBrands/PopularSnackBrands";
import WeeklyWorkoutTrend from "./components/weeklyWorkoutTrend/WeeklyWorkoutTrend";
import CoffeeConsumption from "./components/coffeeConsumption/CoffeeConsumption";

function DataChartPage() {
  const [activeKey, setActiveKey] = useState<ChartTabKey>("weekly-mood-trend");

  const handleTabChange = (key: ChartTabKey) => {
    setActiveKey(key);
  };

  return (
    <div className={styles.container}>
      <ChartTabs activeKey={activeKey} onChange={handleTabChange} />

      {activeKey === "weekly-mood-trend" && <WeeklyMoodTrend />}
      {activeKey === "popular-snack-brands" && <PopularSnackBrands />}
      {activeKey === "weekly-workout-trend" && <WeeklyWorkoutTrend />}
      {activeKey === "coffee-consumption" && <CoffeeConsumption />}
    </div>
  );
}

export default DataChartPage;

import { useIsFetching } from "@tanstack/react-query";
import { Spin } from "antd";
import styles from "./RootLoading.module.scss";

function RootLoading() {
  const isFetching = useIsFetching({
    predicate: (query) => {
      const data = query.state.data as { pages?: unknown[] } | undefined;

      if (data?.pages && data.pages.length > 0) {
        return false;
      }

      return true;
    },
  });

  if (isFetching === 0) return;

  return (
    <div className={styles.overlay}>
      <div className={styles.spinner_wrapper}>
        <Spin size="large" />
      </div>
    </div>
  );
}

export default RootLoading;

import { useState } from "react";
import { Layout } from "antd";
import styles from "./Header.module.scss";
import HeaderLeft from "./headerLeft/HeaderLeft";
import HeaderRight from "./headerRight/HeaderRight";
import Sidebar from "./sidebar/Sidebar";

const { Header: AntdHeader } = Layout;

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <AntdHeader className={styles.header}>
        <div className={styles.inner}>
          <HeaderLeft onMenuClick={handleMenuClick} />
          <HeaderRight />
        </div>
      </AntdHeader>
      <Sidebar open={sidebarOpen} onClose={handleSidebarClose} />
    </>
  );
}

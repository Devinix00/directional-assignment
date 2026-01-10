import { Layout as AntLayout } from "antd";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import styles from "./Layout.module.scss";

const { Content } = AntLayout;

export default function Layout() {
  return (
    <AntLayout className={styles.layout}>
      <Header />
      <Content className={styles.content}>
        <Outlet />
      </Content>
      <Footer />
    </AntLayout>
  );
}

import { Layout } from "antd";
import styles from "./Footer.module.scss";

export default function Footer() {
  const { Footer: AntdFooter } = Layout;

  return (
    <AntdFooter className={styles.footer}>Developed by Devinix</AntdFooter>
  );
}

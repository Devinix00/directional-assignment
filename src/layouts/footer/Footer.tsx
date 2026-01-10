import { Layout } from "antd";
import styles from "./Footer.module.scss";

const { Footer: AntdFooter } = Layout;

export default function Footer() {
  return (
    <AntdFooter className={styles.footer}>Developed by Devinix</AntdFooter>
  );
}

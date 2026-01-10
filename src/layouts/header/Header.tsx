import { Layout } from "antd";
import { Link } from "react-router-dom";
import PATH from "../../router/path";
import styles from "./Header.module.scss";

const { Header: AntdHeader } = Layout;

export default function Header() {
  return (
    <AntdHeader className={styles.header}>
      <Link to={PATH.HOME} className={styles.logo}>
        <span>Logo</span>
      </Link>
      <nav className={styles.nav}>
        <Link to={PATH.HOME}>홈</Link>
        <Link to={PATH.LOGIN}>로그인</Link>
      </nav>
    </AntdHeader>
  );
}

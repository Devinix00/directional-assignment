import { Button, Layout } from "antd";
import { Link } from "react-router-dom";
import PATH from "../../router/path";
import styles from "./Header.module.scss";
import useAuthStore from "../../stores/useAuthStore";

const { Header: AntdHeader } = Layout;

export default function Header() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  return (
    <AntdHeader className={styles.header}>
      <Link to={PATH.HOME} className={styles.logo}>
        <span>Logo</span>
      </Link>
      <nav className={styles.nav}>
        <Link to={PATH.HOME}>홈</Link>
        {isAuthenticated ? (
          <Button
            onClick={() => logout()}
            type="link"
            className={styles.logout_button}
          >
            로그아웃
          </Button>
        ) : (
          <Link to={PATH.LOGIN}>로그인</Link>
        )}
      </nav>
    </AntdHeader>
  );
}

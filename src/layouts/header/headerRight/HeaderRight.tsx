import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import PATH from "../../../router/path";
import styles from "./HeaderRight.module.scss";
import useAuthStore from "../../../stores/useAuthStore";

export default function HeaderRight() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className={styles.right}>
      <Link to={PATH.HOME} className={styles.nav_link}>
        홈
      </Link>
      <Link to={PATH.POST_CREATION} className={styles.nav_link}>
        게시글 작성
      </Link>
      {isAuthenticated ? (
        <div className={styles.profile_buttons_container}>
          <Button
            type="text"
            icon={<UserOutlined />}
            className={styles.profile_button}
          />
          <Button
            onClick={() => logout()}
            type="link"
            className={styles.logout_button}
          >
            로그아웃
          </Button>
        </div>
      ) : (
        <Link to={PATH.LOGIN} className={styles.login_button}>
          로그인
        </Link>
      )}
    </div>
  );
}

import { Drawer, Button } from "antd";
import { Link } from "react-router-dom";
import PATH from "../../../router/path";
import styles from "./Sidebar.module.scss";
import useAuthStore from "../../../stores/useAuthStore";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleClickLogin = () => {
    onClose();
    navigate(PATH.LOGIN);
  };

  const handleClickLogout = () => {
    onClose();
    logout();
  };

  return (
    <Drawer
      title="메뉴"
      placement="left"
      onClose={onClose}
      open={open}
      className={styles.sidebar}
      styles={{
        wrapper: {
          width: "80%",
          maxWidth: "400px",
        },
        header: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 24px",
          borderBottom: "1px solid #d9d9d9",
        },
        title: {
          margin: 0,
          fontSize: "18px",
          fontWeight: 600,
        },
        close: {
          margin: 0,
          padding: 0,
          position: "static",
          order: 2,
        },
        body: {
          padding: 0,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        },
      }}
    >
      <div className={styles.content}>
        <nav className={styles.nav}>
          <Link to={PATH.HOME} className={styles.nav_item} onClick={onClose}>
            홈
          </Link>
          <Link
            to={PATH.POST.CREATION}
            className={styles.nav_item}
            onClick={onClose}
          >
            게시글 작성
          </Link>
        </nav>
      </div>
      <div className={styles.footer}>
        {isAuthenticated ? (
          <Button type="primary" size="large" block onClick={handleClickLogout}>
            로그아웃
          </Button>
        ) : (
          <Button type="primary" block size="large" onClick={handleClickLogin}>
            로그인
          </Button>
        )}
      </div>
    </Drawer>
  );
}

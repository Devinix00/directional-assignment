import { Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import PATH from "../../../router/path";
import styles from "./HeaderLeft.module.scss";

interface HeaderLeftProps {
  onMenuClick: () => void;
}

export default function HeaderLeft({ onMenuClick }: HeaderLeftProps) {
  return (
    <div className={styles.left}>
      <Button
        type="text"
        icon={<MenuOutlined />}
        className={styles.menu_button}
        onClick={onMenuClick}
      />
      <Link to={PATH.HOME} className={styles.logo}>
        <span>Logo</span>
      </Link>
    </div>
  );
}


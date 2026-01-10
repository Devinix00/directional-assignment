import { Typography, Button } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import styles from "./PostListLoginRequired.module.scss";
import { useNavigate } from "react-router-dom";
import PATH from "../../../../../router/path";

const { Title, Text } = Typography;

export default function PostListLoginRequired() {
  const navigate = useNavigate();

  const handleClickLogin = () => {
    navigate(PATH.LOGIN);
  };

  return (
    <div className={styles.container}>
      <div className={styles.empty_icon}>
        <LoginOutlined />
      </div>
      <Title className={styles.empty_text}>로그인이 필요합니다</Title>
      <Text className={styles.empty_description}>
        게시글을 보려면 로그인해주세요.
      </Text>

      <Button type="primary" onClick={handleClickLogin}>
        로그인하러 가기
      </Button>
    </div>
  );
}

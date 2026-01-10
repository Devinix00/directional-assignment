import { Typography, Button } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import styles from "./PostListEmpty.module.scss";
import { useNavigate } from "react-router-dom";
import PATH from "../../../../../router/path";

const { Title, Text } = Typography;

export default function PostListEmpty() {
  const navigate = useNavigate();

  const handleClickCreatePost = () => {
    navigate(PATH.POST_CREATION);
  };

  return (
    <div className={styles.container}>
      <div className={styles.empty_icon}>
        <FileTextOutlined />
      </div>
      <Title className={styles.empty_text}>아직 게시글이 없습니다</Title>
      <Text className={styles.empty_description}>
        첫 번째 게시글을 작성해보세요.
      </Text>

      <Button type="primary" onClick={handleClickCreatePost}>
        게시글 작성
      </Button>
    </div>
  );
}

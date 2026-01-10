import { Typography } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import styles from "./PostListEmpty.module.scss";

const { Title, Text } = Typography;

export default function PostListEmpty() {
  return (
    <div className={styles.container}>
      <div className={styles.empty_icon}>
        <FileTextOutlined />
      </div>
      <Title className={styles.empty_text}>아직 게시글이 없습니다</Title>
      <Text className={styles.empty_description}>
        첫 번째 게시글을 작성해보세요.
      </Text>
    </div>
  );
}

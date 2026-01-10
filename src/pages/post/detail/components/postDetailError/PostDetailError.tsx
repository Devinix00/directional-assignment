import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./PostDetailError.module.scss";

const { Title } = Typography;

export default function PostDetailError() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.error}>
        <ExclamationCircleOutlined className={styles.error_icon} />
        <Title level={3}>게시글을 불러올 수 없습니다.</Title>
        <Button type="primary" onClick={() => navigate(-1)}>
          이전 페이지로
        </Button>
      </div>
    </div>
  );
}

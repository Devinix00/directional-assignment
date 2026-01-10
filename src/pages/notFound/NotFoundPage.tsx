import { FileSearchOutlined, HomeOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import PATH from "../../router/path";
import styles from "./NotFoundPage.module.scss";

const { Title } = Typography;

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <FileSearchOutlined className={styles.icon} />
        <Title level={1} className={styles.title}>
          404
        </Title>
        <Title level={3}>페이지를 찾을 수 없습니다</Title>

        <div className={styles.actions}>
          <Button
            type="primary"
            size="large"
            icon={<HomeOutlined />}
            onClick={() => navigate(PATH.HOME)}
          >
            홈으로 이동
          </Button>
          <Button size="large" onClick={() => navigate(-1)}>
            이전 페이지로
          </Button>
        </div>
      </div>
    </div>
  );
}

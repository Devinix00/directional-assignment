import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Space, Tag, Typography } from "antd";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPostQuery } from "../../../services/post/queries";
import { CATEGORY_OPTIONS } from "../../home/constants/postFilter";
import PostDetailError from "./postDetailError/PostDetailError";
import styles from "./PostDetailPage.module.scss";
import postQueryKeys from "../../../services/post/queryKeys";

const { Title, Paragraph } = Typography;

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: post,
    isError,
    isLoading,
  } = useGetPostQuery({
    queryKey: postQueryKeys.postDetail(id || ""),
    id: id || "",
  });

  if (isLoading) return;

  if (isError || !post) {
    return <PostDetailError />;
  }

  const categoryOption = CATEGORY_OPTIONS.find(
    (opt) => opt.value === post.category
  );

  return (
    <div className={styles.container}>
      <Button
        type="primary"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        className={styles.back_button}
      >
        목록으로
      </Button>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.meta}>
            <Tag color="blue">{categoryOption?.label || post.category}</Tag>
            <span className={styles.date}>
              {dayjs(post.createdAt).format("YYYY-MM-DD HH:mm")}
            </span>
          </div>
          <Title level={2} className={styles.title}>
            {post.title}
          </Title>
        </div>

        {post.tags.length > 0 && (
          <div className={styles.tags}>
            <Space wrap>
              {post.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </Space>
          </div>
        )}

        <div className={styles.body}>
          <Paragraph className={styles.text}>{post.body}</Paragraph>
        </div>
      </div>
    </div>
  );
}

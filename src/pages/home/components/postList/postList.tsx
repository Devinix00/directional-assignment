import { Space, Table, Tag } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import dayjs from "dayjs";
import type { Post } from "../../../../services/post/types";
import styles from "./PostList.module.scss";
import PostListEmpty from "./postListEmpty/PostListEmpty";
import { CATEGORY_OPTIONS } from "../../constants/postFilter";

interface PostListProps {
  posts: Post[];
  isLoading: boolean;
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
  hasNextPage: boolean;
}

export default function PostList({
  posts,
  isLoading,
  loadMoreRef,
  hasNextPage,
}: PostListProps) {
  const columns: ColumnsType<Post> = [
    {
      title: "제목",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
    },
    {
      title: "카테고리",
      dataIndex: "category",
      key: "category",
      width: 120,
      render: (category: string) => {
        const option = CATEGORY_OPTIONS.find((opt) => opt.value === category);
        return <Tag color="blue">{option?.label || category}</Tag>;
      },
    },
    {
      title: "태그",
      dataIndex: "tags",
      key: "tags",
      render: (tags: string[]) => (
        <Space wrap>
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "작성일",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
    },
  ];

  const tableProps: TableProps<Post> = {
    columns,
    dataSource: posts,
    rowKey: "id",
    loading: isLoading && posts.length === 0,
    scroll: { x: 800 },
    pagination: false,
    size: "middle",
  };

  return (
    <div className={styles.container}>
      {posts.length === 0 && !isLoading ? (
        <PostListEmpty />
      ) : (
        <>
          <Table {...tableProps} />
          {hasNextPage && <div ref={loadMoreRef} />}
        </>
      )}
    </div>
  );
}

import { Space, Table, Tag, Button, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType, TableProps } from "antd/es/table";
import dayjs from "dayjs";
import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { Post } from "../../../../services/post/types";
import styles from "./PostList.module.scss";
import PostListEmpty from "./postListEmpty/PostListEmpty";
import PostListLoginRequired from "./postListLoginRequired/PostListLoginRequired";
import { CATEGORY_OPTIONS } from "../../../../constants/post";
import type { ColumnKey } from "../../constants/postFilter";
import ResizableTitle from "./ResizableTitle";
import PATH from "../../../../router/path";
import { useDeletePostMutation } from "../../../../services/post/mutations";
import useAuthStore from "../../../../stores/useAuthStore";

interface PostListProps {
  posts: Post[];
  isLoading: boolean;
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
  hasNextPage: boolean;
  visibleColumns: ColumnKey[];
  columnWidths: Partial<Record<ColumnKey, number>>;
  onColumnWidthChange: (key: ColumnKey, width: number) => void;
  postListQueryKey: readonly unknown[];
}

export default function PostList({
  posts,
  isLoading,
  loadMoreRef,
  hasNextPage,
  visibleColumns,
  columnWidths,
  onColumnWidthChange,
  postListQueryKey,
}: PostListProps) {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { mutate: deletePost, isPending: isDeleting } =
    useDeletePostMutation(postListQueryKey);

  const handleDelete = useCallback(
    (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      Modal.confirm({
        title: "게시글 삭제",
        content: "정말 이 게시글을 삭제하시겠습니까?",
        okText: "삭제",
        okType: "danger",
        cancelText: "취소",
        onOk: () => {
          deletePost(id);
        },
      });
    },
    [deletePost]
  );

  const allColumns: ColumnsType<Post> = useMemo(
    () => [
      {
        title: "제목",
        dataIndex: "title",
        key: "title",
        ellipsis: true,
        width: columnWidths.title,
      },
      {
        title: "카테고리",
        dataIndex: "category",
        key: "category",
        width: columnWidths.category,
        render: (category: string) => {
          const option = CATEGORY_OPTIONS.find((opt) => opt.value === category);
          return <Tag color="blue">{option?.label || category}</Tag>;
        },
      },
      {
        title: "태그",
        dataIndex: "tags",
        key: "tags",
        width: columnWidths.tags,
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
        width: columnWidths.createdAt,
        render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
      },
      {
        title: "삭제",
        key: "actions",
        width: 80,
        fixed: "right" as const,
        render: (_: unknown, record: Post) => (
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={(e) => handleDelete(e, record.id)}
            loading={isDeleting}
          />
        ),
      },
    ],
    [columnWidths, isDeleting, handleDelete]
  );

  const columns = useMemo(() => {
    const dataColumns = allColumns
      .filter(
        (col) =>
          col.key !== "actions" && visibleColumns.includes(col.key as ColumnKey)
      )
      .map((col) => {
        const columnKey = col.key as ColumnKey;
        const width = columnWidths[columnKey];
        const titleText = col.title as React.ReactNode;

        return {
          ...col,
          width,
          title: (
            <ResizableTitle
              columnKey={columnKey}
              width={width as number}
              onResize={onColumnWidthChange}
            >
              {titleText}
            </ResizableTitle>
          ),
        };
      });

    // 삭제 컬럼은 항상 마지막에 추가
    const actionsColumn = allColumns.find((col) => col.key === "actions");
    return actionsColumn ? [...dataColumns, actionsColumn] : dataColumns;
  }, [allColumns, visibleColumns, columnWidths, onColumnWidthChange]);

  const tableProps: TableProps<Post> = {
    columns,
    dataSource: posts,
    rowKey: "id",
    loading: false,
    pagination: false,
    size: "middle",
    locale: { emptyText: "" },
    onRow: (record) => ({
      onClick: () => {
        navigate(`${PATH.POST.ROOT}/${record.id}`);
      },
      className: styles.table_row,
    }),
  };

  return (
    <div className={styles.container}>
      {isAuthenticated ? (
        <>
          {posts.length === 0 && !isLoading ? (
            <PostListEmpty />
          ) : (
            <>
              <Table {...tableProps} />
              {hasNextPage && <div ref={loadMoreRef} />}
            </>
          )}
        </>
      ) : (
        <PostListLoginRequired />
      )}
    </div>
  );
}

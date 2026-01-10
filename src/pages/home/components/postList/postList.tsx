import { Space, Table, Tag } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import dayjs from "dayjs";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { Post } from "../../../../services/post/types";
import styles from "./PostList.module.scss";
import PostListEmpty from "./postListEmpty/PostListEmpty";
import { CATEGORY_OPTIONS } from "../../constants/postFilter";
import type { ColumnKey } from "../../constants/postFilter";
import ResizableTitle from "./ResizableTitle";
import PATH from "../../../../router/path";

interface PostListProps {
  posts: Post[];
  isLoading: boolean;
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
  hasNextPage: boolean;
  visibleColumns: ColumnKey[];
  columnWidths: Partial<Record<ColumnKey, number>>;
  onColumnWidthChange: (key: ColumnKey, width: number) => void;
}

export default function PostList({
  posts,
  isLoading,
  loadMoreRef,
  hasNextPage,
  visibleColumns,
  columnWidths,
  onColumnWidthChange,
}: PostListProps) {
  const navigate = useNavigate();
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
    ],
    [columnWidths]
  );

  const columns = useMemo(() => {
    return allColumns
      .filter((col) => visibleColumns.includes(col.key as ColumnKey))
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

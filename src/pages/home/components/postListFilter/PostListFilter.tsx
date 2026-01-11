import {
  SearchOutlined,
  SettingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Dropdown, Input, Modal, Select, Space } from "antd";
import { useState } from "react";
import type { GetPostListParams } from "../../../../services/post/types";
import { CATEGORY_OPTIONS } from "../../../../constants/post";
import {
  COLUMN_OPTIONS,
  ORDER_OPTIONS,
  SORT_OPTIONS,
  type ColumnKey,
} from "../../constants/postFilter";
import styles from "./PostListFilter.module.scss";
import { useDeleteAllPostsMutation } from "../../../../services/post/mutations";
const { Search } = Input;
const { Option } = Select;

interface PostListFilterProps {
  searchValue: string;
  handleSetSearchValue: (value: string) => void;
  onSearch: (value: string) => void;
  params: GetPostListParams;
  onFilterChange: (
    field: "category" | "sort" | "order",
    value: string | null
  ) => void;
  visibleColumns: ColumnKey[];
  onColumnVisibilityChange: (columns: ColumnKey[]) => void;
  postListQueryKey: readonly unknown[];
}

function PostListFilter({
  searchValue,
  handleSetSearchValue,
  onSearch,
  params,
  onFilterChange,
  visibleColumns,
  onColumnVisibilityChange,
  postListQueryKey,
}: PostListFilterProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { mutate: deleteAllPosts, isPending: isDeletingAll } =
    useDeleteAllPostsMutation(postListQueryKey);

  const handleColumnChange = (checkedValues: string[]) => {
    onColumnVisibilityChange(checkedValues as ColumnKey[]);
  };

  const handleDeleteAll = () => {
    Modal.confirm({
      title: "전체 게시글 삭제",
      content: "정말 모든 게시글을 삭제하시겠습니까?",
      okText: "삭제",
      okType: "danger",
      cancelText: "취소",
      onOk: () => {
        deleteAllPosts();
      },
    });
  };

  const columnMenuItems = [
    {
      key: "columns",
      label: (
        <div onClick={(e) => e.stopPropagation()}>
          <Checkbox.Group
            value={visibleColumns}
            onChange={handleColumnChange}
            style={{ display: "flex", flexDirection: "column", gap: 8 }}
          >
            {COLUMN_OPTIONS.map((option) => (
              <Checkbox key={option.key} value={option.key}>
                {option.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Space size="middle" wrap className={styles.filter_space}>
        <Search
          placeholder="제목/본문 검색"
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          className={styles.search_input}
          value={searchValue}
          onChange={(e) => handleSetSearchValue(e.target.value)}
          onSearch={onSearch}
        />

        <Select
          placeholder="카테고리"
          className={styles.category_select}
          value={params.category}
          onChange={(value) =>
            onFilterChange("category", value as string | null)
          }
        >
          {CATEGORY_OPTIONS.map((option) => (
            <Option key={option.value ?? "all"} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
        <Select
          placeholder="정렬 기준"
          className={styles.sort_select}
          value={params.sort}
          onChange={(value) => onFilterChange("sort", value as string)}
        >
          {SORT_OPTIONS.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
        <Select
          placeholder="정렬 방향"
          className={styles.order_select}
          value={params.order}
          onChange={(value) => onFilterChange("order", value as string)}
        >
          {ORDER_OPTIONS.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
        <Dropdown
          menu={{ items: columnMenuItems }}
          trigger={["click"]}
          placement="bottomRight"
          open={dropdownOpen}
          onOpenChange={setDropdownOpen}
        >
          <Button
            icon={<SettingOutlined />}
            className={styles.column_setting_button}
          >
            컬럼 설정
          </Button>
        </Dropdown>
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={handleDeleteAll}
          loading={isDeletingAll}
          className={styles.delete_all_button}
        >
          전체 삭제
        </Button>
      </Space>
    </div>
  );
}

export default PostListFilter;

import { Space, Select, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./PostListFilter.module.scss";
import type { GetPostListParams } from "../../../../services/post/types";
import {
  CATEGORY_OPTIONS,
  ORDER_OPTIONS,
  SORT_OPTIONS,
} from "../../constants/postFilter";
const { Search } = Input;
const { Option } = Select;

interface PostListFilterProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  onSearch: (value: string) => void;
  params: GetPostListParams;
  onFilterChange: (
    field: "category" | "sort" | "order",
    value: string | null
  ) => void;
}

function PostListFilter({
  searchValue,
  setSearchValue,
  onSearch,
  params,
  onFilterChange,
}: PostListFilterProps) {
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
          onChange={(e) => setSearchValue(e.target.value)}
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
      </Space>
    </div>
  );
}

export default PostListFilter;

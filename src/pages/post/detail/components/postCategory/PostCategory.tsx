import { EditOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Space, Tag, Select } from "antd";
import dayjs from "dayjs";
import { CATEGORY_OPTIONS } from "../../../../../constants/post";
import styles from "./PostCategory.module.scss";

const { Option } = Select;

const POST_CATEGORY_OPTIONS = CATEGORY_OPTIONS.filter(
  (option) => option.value !== null
);

interface PostCategoryProps {
  category: string;
  createdAt: string;
  isEditing: boolean;
  editedCategory?: "NOTICE" | "QNA" | "FREE";
  isUpdating: boolean;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onCategoryChange: (value: "NOTICE" | "QNA" | "FREE") => void;
  onSave: () => void;
}

export default function PostCategory({
  category,
  createdAt,
  isEditing,
  editedCategory,
  isUpdating,
  onStartEdit,
  onCancelEdit,
  onCategoryChange,
  onSave,
}: PostCategoryProps) {
  if (isEditing) {
    return (
      <Space align="center">
        <Select
          value={
            editedCategory !== undefined
              ? editedCategory
              : (category as "NOTICE" | "QNA" | "FREE")
          }
          onChange={onCategoryChange}
          style={{ width: 120 }}
          autoFocus
        >
          {POST_CATEGORY_OPTIONS.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
        <Button
          icon={<CheckOutlined />}
          onClick={onSave}
          loading={isUpdating}
          type="primary"
          size="small"
        />
        <Button
          icon={<CloseOutlined />}
          onClick={onCancelEdit}
          disabled={isUpdating}
          size="small"
        />
      </Space>
    );
  }

  return (
    <Space align="center">
      <Tag color="blue">
        {CATEGORY_OPTIONS.find((opt) => opt.value === category)?.label ||
          category}
      </Tag>
      <Button
        icon={<EditOutlined />}
        onClick={onStartEdit}
        type="text"
        size="small"
      />
      <span className={styles.date}>
        {dayjs(createdAt).format("YYYY-MM-DD HH:mm")}
      </span>
    </Space>
  );
}


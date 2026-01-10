import { EditOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Space, Tag, Select } from "antd";
import styles from "./PostTags.module.scss";

interface PostTagsProps {
  tags: string[];
  isEditing: boolean;
  editedTags?: string[];
  isUpdating: boolean;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onTagsChange: (tags: string[]) => void;
  onSave: () => void;
}

export default function PostTags({
  tags,
  isEditing,
  editedTags,
  isUpdating,
  onStartEdit,
  onCancelEdit,
  onTagsChange,
  onSave,
}: PostTagsProps) {
  if (isEditing) {
    return (
      <div className={styles.tags}>
        <div className={styles.tags_edit}>
          <Select
            mode="tags"
            value={editedTags !== undefined ? editedTags : tags}
            onChange={onTagsChange}
            placeholder="태그를 입력하세요 (엔터로 추가)"
            tokenSeparators={[","]}
            style={{ width: "100%" }}
          />
          <Space align="center">
            <Button
              icon={<CheckOutlined />}
              onClick={onSave}
              loading={isUpdating}
              type="primary"
            />
            <Button
              icon={<CloseOutlined />}
              onClick={onCancelEdit}
              disabled={isUpdating}
            />
          </Space>
        </div>
      </div>
    );
  }

  if (tags.length === 0) {
    return null;
  }

  return (
    <div className={styles.tags}>
      <div className={styles.tags_display}>
        <Space wrap align="center">
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Space>
        <Button
          icon={<EditOutlined />}
          onClick={onStartEdit}
          type="text"
          size="small"
        />
      </div>
    </div>
  );
}

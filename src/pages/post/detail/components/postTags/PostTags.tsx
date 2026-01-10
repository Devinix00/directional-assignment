import { EditOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Space, Tag } from "antd";
import styles from "./PostTags.module.scss";
import TagInput from "../../../../../components/TagInput/TagInput";

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
          <TagInput
            value={editedTags !== undefined ? editedTags : tags}
            onChange={onTagsChange}
            placeholder="태그를 입력하세요 (엔터로 추가)"
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

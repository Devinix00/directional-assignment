import { EditOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Space, Typography, Input } from "antd";
import styles from "./PostTitle.module.scss";
import { POST_LIMITS } from "../../../../../constants/post";

const { Title } = Typography;

interface PostTitleProps {
  title: string;
  isEditing: boolean;
  editedTitle?: string;
  isUpdating: boolean;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onTitleChange: (value: string) => void;
  onSave: () => void;
}

export default function PostTitle({
  title,
  isEditing,
  editedTitle,
  isUpdating,
  onStartEdit,
  onCancelEdit,
  onTitleChange,
  onSave,
}: PostTitleProps) {
  if (isEditing) {
    return (
      <div className={styles.title_edit}>
        <Input
          value={editedTitle !== undefined ? editedTitle : title}
          onChange={(e) => onTitleChange(e.target.value)}
          className={styles.title_input}
          placeholder="제목을 입력하세요"
          maxLength={POST_LIMITS.TITLE_MAX_LENGTH}
          showCount
        />
        <Space align="center">
          <Button
            icon={<CheckOutlined />}
            onClick={onSave}
            loading={isUpdating}
            type="primary"
            disabled={!editedTitle || editedTitle.trim() === ""}
          />
          <Button
            icon={<CloseOutlined />}
            onClick={onCancelEdit}
            disabled={isUpdating}
          />
        </Space>
      </div>
    );
  }

  return (
    <div className={styles.title_row}>
      <Title level={2} className={styles.title}>
        {title}
      </Title>
      <Button
        icon={<EditOutlined />}
        onClick={onStartEdit}
        type="text"
        size="small"
      />
    </div>
  );
}

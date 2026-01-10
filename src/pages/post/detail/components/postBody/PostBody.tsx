import { EditOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Space, Typography, Input } from "antd";
import styles from "./PostBody.module.scss";
import { POST_LIMITS } from "../../../../../constants/post";

const { Paragraph } = Typography;
const { TextArea } = Input;

interface PostBodyProps {
  body: string;
  isEditing: boolean;
  editedBody?: string;
  isUpdating: boolean;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onBodyChange: (value: string) => void;
  onSave: () => void;
}

export default function PostBody({
  body,
  isEditing,
  editedBody,
  isUpdating,
  onStartEdit,
  onCancelEdit,
  onBodyChange,
  onSave,
}: PostBodyProps) {
  if (isEditing) {
    return (
      <div className={styles.body_edit}>
        <TextArea
          value={editedBody !== undefined ? editedBody : body}
          onChange={(e) => onBodyChange(e.target.value)}
          rows={10}
          className={styles.body_input}
          placeholder="내용을 입력하세요"
          maxLength={POST_LIMITS.BODY_MAX_LENGTH}
          showCount
          autoFocus
        />
        <div className={styles.body_actions}>
          <Space align="center">
            <Button
              icon={<CheckOutlined />}
              onClick={onSave}
              loading={isUpdating}
              type="primary"
              disabled={!editedBody || editedBody.trim() === ""}
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

  return (
    <div className={styles.body_row}>
      <Paragraph className={styles.text}>{body}</Paragraph>
      <Button
        icon={<EditOutlined />}
        onClick={onStartEdit}
        type="text"
        size="small"
      />
    </div>
  );
}

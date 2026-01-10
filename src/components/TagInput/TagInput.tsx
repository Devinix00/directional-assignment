import { Input, Tag } from "antd";
import type { KeyboardEvent } from "react";
import { useState } from "react";
import { POST_LIMITS } from "../../constants/post";
import { canAddTag } from "../../utils/postValidation";
import styles from "./TagInput.module.scss";

interface TagInputProps {
  value?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

//  커스텀 태그 입력 컴포넌트
//  Ant Design의 Select 컴포넌트(mode="tags")는 기본적으로 중복 태그 입력 시
//  토글 방식으로 동작하여 기존 태그가 제거되는 문제가 있습니다.
//  이를 해결하기 위해 자체 공통 컴포넌트로 개발했습니다.

export default function TagInput({
  value = [],
  onChange,
  placeholder = "태그를 입력하세요 (엔터로 추가)",
  disabled = false,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(inputValue.trim());
    } else if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
      removeTag(value.length - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const addTag = (tag: string) => {
    const { canAdd } = canAddTag(tag, value);

    if (!canAdd) return;

    const newTags = [...value, tag];
    onChange?.(newTags);
    setInputValue("");
  };

  const removeTag = (index: number) => {
    const newTags = value.filter((_, i) => i !== index);
    onChange?.(newTags);
  };

  return (
    <div className={styles.tagInput}>
      <div className={styles.tagsContainer}>
        {value.map((tag, index) => (
          <Tag
            key={`${tag}-${index}`}
            closable={!disabled}
            onClose={() => removeTag(index)}
            className={styles.tag}
          >
            {tag}
          </Tag>
        ))}
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder={value.length === 0 ? placeholder : ""}
          disabled={disabled}
          className={styles.input}
          maxLength={POST_LIMITS.TAG_MAX_LENGTH}
        />
      </div>
    </div>
  );
}

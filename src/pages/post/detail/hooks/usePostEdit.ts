import { message } from "antd";
import { useState } from "react";
import type { Post } from "../../../../services/post/types";
import type { UpdatePostRequest } from "../../../../services/post/types";
import {
  validateForbiddenWord,
  validateTagsForbiddenWord,
  validateTitleLength,
  validateBodyLength,
} from "../../../../utils/postValidation";

type EditingField = "title" | "body" | "category" | "tags" | null;

interface EditedValues {
  title?: string;
  body?: string;
  category?: "NOTICE" | "QNA" | "FREE";
  tags?: string[];
}

interface UsePostEditParams {
  post: Post;
  updatePost: (
    changes: UpdatePostRequest,
    options?: { onSuccess?: () => void; onError?: () => void }
  ) => void;
}

export function usePostEdit({ post, updatePost }: UsePostEditParams) {
  const [editingField, setEditingField] = useState<EditingField>(null);
  const [editedValues, setEditedValues] = useState<EditedValues>({});

  const handleStartEdit = (field: EditingField) => {
    setEditingField(field);
    if (field === "title") {
      setEditedValues({ ...editedValues, title: post.title });
      return;
    }
    if (field === "body") {
      setEditedValues({ ...editedValues, body: post.body });
      return;
    }
    if (field === "category") {
      setEditedValues({
        ...editedValues,
        category: post.category as "NOTICE" | "QNA" | "FREE",
      });
      return;
    }
    if (field === "tags") {
      setEditedValues({ ...editedValues, tags: post.tags });
      return;
    }
  };

  const handleCancelEdit = () => {
    setEditingField(null);
    setEditedValues({});
  };

  const handleFieldChange = (
    field: "title" | "body" | "category" | "tags",
    value: string | "NOTICE" | "QNA" | "FREE" | string[]
  ) => {
    setEditedValues({ ...editedValues, [field]: value });
  };

  const handleSaveField = (field: EditingField) => {
    if (!field) return;

    if (field === "title") {
      const newTitle = editedValues.title;
      if (newTitle === undefined || newTitle === post.title) {
        message.info("변경된 내용이 없습니다.");
        setEditingField(null);
        return;
      }
      if (!validateTitleLength(newTitle)) return;
      if (!validateForbiddenWord(newTitle, "제목")) return;
      setEditingField(null);
      setEditedValues({});

      updatePost(
        { title: newTitle },
        {
          onSuccess: () => {
            message.success("수정되었습니다.");
          },
          onError: () => {
            setEditingField(field);
            setEditedValues({ [field]: newTitle });
          },
        }
      );
      return;
    }

    if (field === "body") {
      const newBody = editedValues.body;
      if (newBody === undefined || newBody === post.body) {
        message.info("변경된 내용이 없습니다.");
        setEditingField(null);
        return;
      }
      if (!validateBodyLength(newBody)) return;
      if (!validateForbiddenWord(newBody, "내용")) return;
      setEditingField(null);
      setEditedValues({});
      updatePost(
        { body: newBody },
        {
          onSuccess: () => {
            message.success("수정되었습니다.");
          },
          onError: () => {
            setEditingField(field);
            setEditedValues({ [field]: newBody });
          },
        }
      );
      return;
    }

    if (field === "category") {
      const newCategory = editedValues.category;
      if (newCategory === undefined || newCategory === post.category) {
        message.info("변경된 내용이 없습니다.");
        setEditingField(null);
        return;
      }
      setEditingField(null);
      setEditedValues({});

      updatePost(
        { category: newCategory },
        {
          onSuccess: () => {
            message.success("수정되었습니다.");
          },
          onError: () => {
            setEditingField(field);
            setEditedValues({ [field]: newCategory });
          },
        }
      );
      return;
    }

    if (field === "tags") {
      const newTags = editedValues.tags;
      if (
        newTags === undefined ||
        JSON.stringify(newTags) === JSON.stringify(post.tags)
      ) {
        message.info("변경된 내용이 없습니다.");
        setEditingField(null);
        return;
      }
      if (!validateTagsForbiddenWord(newTags)) return;
      setEditingField(null);
      setEditedValues({});

      updatePost(
        { tags: newTags },
        {
          onSuccess: () => {
            message.success("수정되었습니다.");
          },
          onError: () => {
            setEditingField(field);
            setEditedValues({ [field]: newTags });
          },
        }
      );
      return;
    }
  };

  return {
    editingField,
    editedValues,
    handleStartEdit,
    handleCancelEdit,
    handleFieldChange,
    handleSaveField,
  };
}

import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPostQuery } from "../../../services/post/queries";
import { useUpdatePostMutation } from "../../../services/post/mutations";
import PostDetailError from "./components/postDetailError/PostDetailError";
import styles from "./PostDetailPage.module.scss";
import postQueryKeys from "../../../services/post/queryKeys";
import PostCategory from "./components/postCategory/PostCategory";
import PostTitle from "./components/postTitle/PostTitle";
import PostTags from "./components/postTags/PostTags";
import PostBody from "./components/postBody/PostBody";
import { usePostEdit } from "./hooks/usePostEdit";

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const queryKey = postQueryKeys.postDetail(id || "");
  const {
    data: post,
    isError,
    isLoading,
  } = useGetPostQuery({
    queryKey,
    id: id || "",
  });

  const { mutate: updatePost, isPending: isUpdating } = useUpdatePostMutation(
    queryKey,
    id || ""
  );

  const {
    editingField,
    editedValues,
    handleStartEdit,
    handleCancelEdit,
    handleFieldChange,
    handleSaveField,
  } = usePostEdit({
    post: post!,
    updatePost,
  });

  if (isLoading) return;

  if (!id || isError || !post) {
    return <PostDetailError />;
  }

  return (
    <div className={styles.container}>
      <Button
        type="primary"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        className={styles.back_button}
      >
        목록으로
      </Button>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.meta}>
            <PostCategory
              category={post.category}
              createdAt={post.createdAt}
              isEditing={editingField === "category"}
              editedCategory={editedValues.category}
              isUpdating={isUpdating}
              onStartEdit={() => handleStartEdit("category")}
              onCancelEdit={handleCancelEdit}
              onCategoryChange={(value) => handleFieldChange("category", value)}
              onSave={() => handleSaveField("category")}
            />
          </div>
          <PostTitle
            title={post.title}
            isEditing={editingField === "title"}
            editedTitle={editedValues.title}
            isUpdating={isUpdating}
            onStartEdit={() => handleStartEdit("title")}
            onCancelEdit={handleCancelEdit}
            onTitleChange={(value) => handleFieldChange("title", value)}
            onSave={() => handleSaveField("title")}
          />
        </div>

        <PostTags
          tags={post.tags}
          isEditing={editingField === "tags"}
          editedTags={editedValues.tags}
          isUpdating={isUpdating}
          onStartEdit={() => handleStartEdit("tags")}
          onCancelEdit={handleCancelEdit}
          onTagsChange={(tags) => handleFieldChange("tags", tags)}
          onSave={() => handleSaveField("tags")}
        />

        <div className={styles.body}>
          <PostBody
            body={post.body}
            isEditing={editingField === "body"}
            editedBody={editedValues.body}
            isUpdating={isUpdating}
            onStartEdit={() => handleStartEdit("body")}
            onCancelEdit={handleCancelEdit}
            onBodyChange={(value) => handleFieldChange("body", value)}
            onSave={() => handleSaveField("body")}
          />
        </div>
      </div>
    </div>
  );
}

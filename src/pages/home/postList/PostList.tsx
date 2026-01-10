import { useGetPostListQuery } from "../../../services/post/queries";
import styles from "./postList.module.scss";
import PostListEmpty from "./postListEmpty/PostListEmpty";

export default function PostList() {
  const { data: postList } = useGetPostListQuery();

  return (
    <div className={styles.container}>
      {postList?.items.length === 0 && <PostListEmpty />}
    </div>
  );
}

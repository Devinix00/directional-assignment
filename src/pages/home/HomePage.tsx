import styles from "./HomePage.module.scss";
import PostList from "./postList/PostList";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <PostList />
    </div>
  );
}

import { useMemo } from "react";
import styles from "./HomePage.module.scss";
import PostList from "./components/postList/postList";
import PostListFilter from "./components/postListFilter/PostListFilter";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { useGetPostListQuery } from "../../services/post/queries";
import { usePostListFilter } from "./hooks/usePostListFilter";
import { usePostListColumnResize } from "./hooks/usePostListColumnResize";
import postQueryKeys from "../../services/post/queryKeys";

export default function HomePage() {
  const {
    params,
    searchValue,
    setSearchValue,
    handleFilterChange,
    handleSearch,
  } = usePostListFilter();

  const {
    visibleColumns,
    setVisibleColumns,
    columnWidths,
    handleColumnWidthChange,
  } = usePostListColumnResize();

  const postListQueryKey = postQueryKeys.postList(params);

  const { data, isLoading, fetchNextPage, hasNextPage } = useGetPostListQuery({
    queryKey: postListQueryKey,
    params,
  });

  const allPosts = useMemo(() => {
    return data?.pages.flatMap((page) => page.items) ?? [];
  }, [data]);

  const { ref: loadMoreRef } = useInfiniteScroll<HTMLDivElement>({
    fetchNextPage: fetchNextPage,
    hasNextPage: !!hasNextPage,
  });

  return (
    <div className={styles.container}>
      <PostListFilter
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onSearch={handleSearch}
        params={params}
        onFilterChange={handleFilterChange}
        visibleColumns={visibleColumns}
        onColumnVisibilityChange={setVisibleColumns}
        postListQueryKey={postListQueryKey}
      />
      <PostList
        posts={allPosts}
        isLoading={isLoading}
        loadMoreRef={loadMoreRef}
        hasNextPage={hasNextPage}
        visibleColumns={visibleColumns}
        columnWidths={columnWidths}
        onColumnWidthChange={handleColumnWidthChange}
        postListQueryKey={postListQueryKey}
      />
    </div>
  );
}

import { useCallback, useMemo, useState } from "react";
import styles from "./HomePage.module.scss";
import PostList from "./components/postList/postList";
import PostListFilter from "./components/postListFilter/PostListFilter";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { useGetPostListQuery } from "../../services/post/queries";
import type { GetPostListParams } from "../../services/post/types";

export default function HomePage() {
  const [params, setParams] = useState<GetPostListParams>({
    limit: 10,
    sort: "createdAt",
    order: "desc",
    category: null,
  });
  const [searchValue, setSearchValue] = useState("");

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetPostListQuery(params);

  const allPosts = useMemo(() => {
    return data?.pages.flatMap((page) => page.items) ?? [];
  }, [data]);

  const handleFetchNextPage = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const { ref: loadMoreRef } = useInfiniteScroll<HTMLDivElement>({
    fetchNextPage: handleFetchNextPage,
    hasNextPage: !!hasNextPage,
  });

  const resetAndUpdateParams = useCallback(
    (updater: (prev: GetPostListParams) => GetPostListParams) => {
      setParams((prev) => ({
        ...updater(prev),
        nextCursor: undefined,
      }));
    },
    []
  );

  const handleFilterChange = useCallback(
    (field: "category" | "sort" | "order", value: string | null) => {
      resetAndUpdateParams((prev) => ({
        ...prev,
        [field]: value as GetPostListParams[typeof field],
      }));
    },
    [resetAndUpdateParams]
  );

  const handleSearch = useCallback(
    (value: string) => {
      setSearchValue(value);
      resetAndUpdateParams((prev) => ({
        ...prev,
        search: value || undefined,
      }));
    },
    [resetAndUpdateParams]
  );

  return (
    <div className={styles.container}>
      <PostListFilter
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onSearch={handleSearch}
        params={params}
        onFilterChange={handleFilterChange}
      />
      <PostList
        posts={allPosts}
        isLoading={isLoading}
        loadMoreRef={loadMoreRef}
        hasNextPage={hasNextPage}
      />
    </div>
  );
}

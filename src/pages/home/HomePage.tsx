import { useMemo, useState } from "react";
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

  const { data, isLoading, fetchNextPage, hasNextPage } =
    useGetPostListQuery(params);

  const allPosts = useMemo(() => {
    return data?.pages.flatMap((page) => page.items) ?? [];
  }, [data]);

  const { ref: loadMoreRef } = useInfiniteScroll<HTMLDivElement>({
    fetchNextPage: fetchNextPage,
    hasNextPage: !!hasNextPage,
  });

  const handleFilterChange = (
    field: "category" | "sort" | "order",
    value: string | null
  ) => {
    setParams((prev) => ({
      ...prev,
      [field]: value as GetPostListParams[typeof field],
      nextCursor: undefined,
    }));
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setParams((prev) => ({
      ...prev,
      search: value || undefined,
      nextCursor: undefined,
    }));
  };

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

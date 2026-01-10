import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import postApis from "./apis";
import type { GetPostListParams, PostListResponse } from "./types";

export function useGetPostListQuery({
  queryKey,
  params,
}: {
  queryKey: readonly unknown[];
  params?: GetPostListParams;
}) {
  return useInfiniteQuery<PostListResponse>({
    queryKey,
    queryFn: ({ pageParam }) =>
      postApis.getPostList({
        ...params,
        nextCursor: pageParam as string | undefined,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
  });
}

export function useGetPostQuery({
  queryKey,
  id,
}: {
  queryKey: readonly unknown[];
  id: string;
}) {
  return useQuery({
    queryKey,
    queryFn: () => postApis.getPost(id),
    enabled: !!id,
  });
}

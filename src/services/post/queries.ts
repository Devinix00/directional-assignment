import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import postApis from "./apis";
import postQueryKeys from "./queryKeys";
import type { GetPostListParams, PostListResponse } from "./types";

export function useGetPostListQuery(params?: GetPostListParams) {
  return useInfiniteQuery<PostListResponse>({
    queryKey: postQueryKeys.postList(params),
    queryFn: ({ pageParam }) =>
      postApis.getPostList({
        ...params,
        nextCursor: pageParam as string | undefined,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
  });
}

export function useGetPostQuery(id: string) {
  return useQuery({
    queryKey: postQueryKeys.postDetail(id),
    queryFn: () => postApis.getPost(id),
    enabled: !!id,
  });
}

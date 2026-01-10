import { useMutation, useQueryClient } from "@tanstack/react-query";
import postApis from "./apis";
import type { CreatePostRequest, PostListResponse } from "./types";

export function useCreatePostMutation() {
  return useMutation({
    mutationFn: (data: CreatePostRequest) => postApis.createPost(data),
  });
}

export function useDeletePostMutation(queryKey: readonly unknown[]) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => postApis.deletePost(id),
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<{
        pages: PostListResponse[];
        pageParams?: unknown[];
      }>(queryKey);

      if (previousData?.pages) {
        queryClient.setQueryData(queryKey, {
          ...previousData,
          pages: previousData.pages.map((page) => ({
            ...page,
            items: page.items.filter((item) => item.id !== deletedId),
          })),
        });
      }

      return { previousData };
    },
    onError: (_err, _deletedId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },
  });
}

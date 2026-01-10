import { useMutation } from "@tanstack/react-query";
import postApis from "./apis";
import type { CreatePostRequest } from "./types";

export function useCreatePostMutation() {
  return useMutation({
    mutationFn: (data: CreatePostRequest) => postApis.createPost(data),
  });
}

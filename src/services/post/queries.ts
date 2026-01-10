import { useQuery } from "@tanstack/react-query";
import postApis from "./apis";
import postQueryKeys from "./queryKeys";

export function useGetPostListQuery() {
  return useQuery({
    queryKey: postQueryKeys.postList(),
    queryFn: () => postApis.getPostList(),
  });
}

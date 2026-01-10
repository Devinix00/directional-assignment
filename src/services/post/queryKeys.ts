import type { GetPostListParams } from "./types";

const postQueryKeys = {
  postList: (params?: GetPostListParams) => ["postList", params],
  postDetail: (id: string) => ["postDetail", id],
};

export default postQueryKeys;

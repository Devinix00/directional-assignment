import type { GetPostListParams } from "./types";

const postQueryKeys = {
  postList: (params?: GetPostListParams) => ["postList", params],
};

export default postQueryKeys;

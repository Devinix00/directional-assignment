import apiInstance from "../apiInstance";
import type {
  PostListResponse,
  CreatePostRequest,
  Post,
  GetPostListParams,
} from "./types";

const postApis = {
  getPostList: async (
    params?: GetPostListParams
  ): Promise<PostListResponse> => {
    // undefined와 null 값 제거 (category가 null일 때는 제거)
    const cleanedParams = params
      ? Object.fromEntries(
          Object.entries(params).filter(
            ([_, value]) => value !== undefined && value !== null
          )
        )
      : undefined;
    const response = await apiInstance.get("/posts", { params: cleanedParams });
    return response.data;
  },
  createPost: async (data: CreatePostRequest): Promise<Post> => {
    const response = await apiInstance.post("/posts", data);
    return response.data;
  },
};

export default postApis;

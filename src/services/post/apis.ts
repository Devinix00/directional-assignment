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
    const cleanedParams = params
      ? Object.fromEntries(
          Object.entries(params).filter(
            ([, value]) => value !== undefined && value !== null
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
  getPost: async (id: string): Promise<Post> => {
    const response = await apiInstance.get(`/posts/${id}`);
    return response.data;
  },
  deletePost: async (id: string): Promise<void> => {
    await apiInstance.delete(`/posts/${id}`);
  },
};

export default postApis;

import apiInstance from "../apiInstance";
import type { PostListResponse, CreatePostRequest, Post } from "./types";

const postApis = {
  getPostList: async (): Promise<PostListResponse> => {
    const response = await apiInstance.get("/posts");
    return response.data;
  },
  createPost: async (data: CreatePostRequest): Promise<Post> => {
    const response = await apiInstance.post("/posts", data);
    return response.data;
  },
};

export default postApis;

import apiInstance from "../apiInstance";
import type { PostListResponse } from "./types";

const postApis = {
  getPostList: async (): Promise<PostListResponse> => {
    const response = await apiInstance.get("/posts");
    return response.data;
  },
};

export default postApis;

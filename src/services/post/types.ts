export interface PostListResponse {
  items: Post[];
  nextCursor: string;
  prevCursor: string;
}

export interface Post {
  id: string;
  userId: string;
  title: string;
  body: string;
  category: string;
  tags: string[];
  createdAt: string;
}

export interface CreatePostRequest {
  title: string;
  body: string;
  category: "NOTICE" | "QNA" | "FREE";
  tags: string[];
}

export interface GetPostListParams {
  limit?: number;
  prevCursor?: string;
  nextCursor?: string;
  sort?: "createdAt" | "title";
  order?: "asc" | "desc";
  category?: "NOTICE" | "QNA" | "FREE" | null;
  from?: string;
  to?: string;
  search?: string;
}

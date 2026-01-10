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

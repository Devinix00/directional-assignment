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

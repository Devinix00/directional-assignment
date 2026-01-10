export const CATEGORY_OPTIONS = [
  { value: null, label: "전체" },
  { value: "NOTICE", label: "공지사항" },
  { value: "QNA", label: "Q&A" },
  { value: "FREE", label: "자유게시판" },
] as const;

export const SORT_OPTIONS = [
  { value: "createdAt", label: "작성일" },
  { value: "title", label: "제목" },
] as const;

export const ORDER_OPTIONS = [
  { value: "asc", label: "오름차순" },
  { value: "desc", label: "내림차순" },
] as const;

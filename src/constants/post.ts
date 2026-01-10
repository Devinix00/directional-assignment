export const CATEGORY_OPTIONS = [
  { value: null, label: "전체" },
  { value: "NOTICE", label: "공지사항" },
  { value: "QNA", label: "Q&A" },
  { value: "FREE", label: "자유게시판" },
] as const;

export const POST_LIMITS = {
  TITLE_MAX_LENGTH: 80,
  BODY_MAX_LENGTH: 2000,
  TAG_MAX_LENGTH: 24,
  MAX_TAGS: 5,
} as const;


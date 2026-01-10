export const SORT_OPTIONS = [
  { value: "createdAt", label: "작성일" },
  { value: "title", label: "제목" },
] as const;

export const ORDER_OPTIONS = [
  { value: "asc", label: "오름차순" },
  { value: "desc", label: "내림차순" },
] as const;

export const COLUMN_OPTIONS = [
  { key: "title", label: "제목" },
  { key: "category", label: "카테고리" },
  { key: "tags", label: "태그" },
  { key: "createdAt", label: "작성일" },
] as const;

export type ColumnKey = (typeof COLUMN_OPTIONS)[number]["key"];

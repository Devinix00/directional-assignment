import { useState } from "react";
import type { GetPostListParams } from "../../../services/post/types";

export function usePostListFilter() {
  const [params, setParams] = useState<GetPostListParams>({
    limit: 10,
    sort: "createdAt",
    order: "desc",
    category: null,
  });
  const [searchValue, setSearchValue] = useState("");

  const handleFilterChange = (
    field: "category" | "sort" | "order",
    value: string | null
  ) => {
    setParams((prev) => ({
      ...prev,
      [field]: value as GetPostListParams[typeof field],
      nextCursor: undefined,
    }));
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setParams((prev) => ({
      ...prev,
      search: value || undefined,
      nextCursor: undefined,
    }));
  };

  return {
    params,
    searchValue,
    setSearchValue,
    handleFilterChange,
    handleSearch,
  };
}


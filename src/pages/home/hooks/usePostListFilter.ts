import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import type { GetPostListParams } from "../../../services/post/types";

const DEFAULT_LIMIT = 10;
const DEFAULT_SORT = "createdAt";
const DEFAULT_ORDER = "desc";

export function usePostListFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo<GetPostListParams>(() => {
    const limit = searchParams.get("limit");
    const sort = searchParams.get("sort");
    const order = searchParams.get("order");
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    return {
      limit: limit ? Number(limit) : DEFAULT_LIMIT,
      sort: (sort as GetPostListParams["sort"]) || DEFAULT_SORT,
      order: (order as GetPostListParams["order"]) || DEFAULT_ORDER,
      category:
        category === "NOTICE" || category === "QNA" || category === "FREE"
          ? category
          : null,
      search: search || undefined,
    };
  }, [searchParams]);

  const searchFromUrl = useMemo(() => {
    return searchParams.get("search") || "";
  }, [searchParams]);

  const [localSearchValue, setLocalSearchValue] = useState(searchFromUrl);
  const searchValue = localSearchValue;

  const updateSearchParams = (updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "" || value === undefined) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });

    newParams.delete("nextCursor");
    setSearchParams(newParams, { replace: true });
  };

  const handleFilterChange = (
    field: "category" | "sort" | "order",
    value: string | null
  ) => {
    updateSearchParams({ [field]: value });
  };

  const handleSearch = (value: string) => {
    setLocalSearchValue(value);
    updateSearchParams({ search: value || null });
  };

  const handleSetSearchValue = useCallback((value: string) => {
    setLocalSearchValue(value);
  }, []);

  return {
    params,
    searchValue,
    handleSetSearchValue,
    handleFilterChange,
    handleSearch,
  };
}

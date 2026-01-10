import { useState } from "react";
import { COLUMN_OPTIONS, type ColumnKey } from "../constants/postFilter";

export function usePostListColumnResize() {
  const [visibleColumns, setVisibleColumns] = useState<ColumnKey[]>(
    COLUMN_OPTIONS.map((col) => col.key)
  );
  const [columnWidths, setColumnWidths] = useState<Record<ColumnKey, number>>({
    title: 200,
    category: 200,
    tags: 200,
    createdAt: 200,
  });

  const handleColumnWidthChange = (key: ColumnKey, width: number) => {
    setColumnWidths((prev) => ({ ...prev, [key]: width }));
  };

  return {
    visibleColumns,
    setVisibleColumns,
    columnWidths,
    handleColumnWidthChange,
  };
}

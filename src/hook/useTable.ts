import { useMemo } from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  // getSortedRowModel,
  useReactTable,
  PaginationState,
  // SortingState,
} from "@tanstack/react-table";

import { useState } from "react";

interface TableManagerProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  isPagination?: boolean;
}

const useTable = <T>(props: TableManagerProps<T>) => {
  const { data, columns, isPagination = false } = props;

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  // const [sorting, setSorting] = useState<SortingState>([
  //   { id: "No", desc: false },
  // ]);

  // Memoize the table instance
  const table = useMemo(() => {
    return useReactTable<T>({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: isPagination ? getPaginationRowModel() : undefined,
      onPaginationChange: setPagination,
      state: { pagination },
    });
  }, [data, columns, isPagination, pagination]);

  return {
    table,
    pagination,
    setPagination,
    totalPageNum: table.getPageCount(),
  };
};

export default useTable;

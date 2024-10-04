import { CSSProperties } from "react";
import { Cell } from "@tanstack/react-table";

interface TableBodyCellProps<T> {
  cell: Cell<T, unknown>;
  style?: CSSProperties;
  className?: string;
}

const TableBodyCell = <T,>({
  cell,
  style,
  className,
}: TableBodyCellProps<T>) => {
  // If it's a function, apply custom cell value when generating columns
  const cellValue =
    typeof cell.column.columnDef.cell === "function"
      ? cell.column.columnDef.cell(cell.getContext())
      : cell.getValue();

  return (
    <td
      style={{ ...style, backgroundColor: "transparent" }}
      className={className}
    >
      {cellValue}
    </td>
  );
};

export default TableBodyCell;

import { CSSProperties } from "react";
import TableBodyRow from "./TableBodyRow";
import { TableProps } from "../../type/type";

interface TableBodyProps<T> extends TableProps<T> {
  subRowExpand?: boolean;
  subRowStyle?: CSSProperties;
  rowHoverColor?: string;
  subRowHoverColor?: string;
}

const TableBody = <T,>(props: TableBodyProps<T>) => {
  const {
    table,
    style,
    className,
    subRowExpand,
    subRowStyle,
    rowHoverColor,
    subRowHoverColor,
  } = props;
  const rows = table.getRowModel().rows;

  return (
    <tbody>
      {rows.map((row) => (
        <TableBodyRow
          key={row.id}
          style={style}
          className={className}
          row={row}
          subRowExpand={subRowExpand}
          subRowStyle={subRowStyle}
          rowHoverColor={rowHoverColor}
          subRowHoverColor={subRowHoverColor}
        />
      ))}
    </tbody>
  );
};

export default TableBody;

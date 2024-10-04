import { CSSProperties, useState } from "react";
import TableCell from "./TableBodyCell";
import TableSubRow from "./TableSubRow";
import { Row } from "@tanstack/react-table";
import { useTableContext } from "../../provider/TableProvider";
import "../../style/style.css";

interface TableBodyRowProps<T> {
  row: Row<T>;
  style?: CSSProperties;
  className?: string;

  subRowExpand?: boolean;
  subRowStyle?: CSSProperties;

  rowHoverColor?: string;
  subRowHoverColor?: string;
}

const TableBodyRow = <T,>(props: TableBodyRowProps<T>) => {
  const {
    row,
    style,
    className,
    subRowExpand,
    subRowStyle,
    rowHoverColor,
    subRowHoverColor,
  } = props;
  const [isRowExapnd, setRowExpand] = useState(false);

  const cellGroup = row.getVisibleCells();
  const { rowClickEvent } = useTableContext();

  const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    if (subRowExpand) {
      setRowExpand(!isRowExapnd);
    }

    if (rowClickEvent) {
      e.stopPropagation();
      rowClickEvent(row as Row<unknown>);
    }
  };

  return (
    <>
      <tr
        key={row.id}
        onClick={handleRowClick}
        style={
          {
            cursor: "default",
            backgroundColor: style?.backgroundColor,
            "--row-hover-color": `${rowHoverColor}`,
          } as CSSProperties
        }
        className="row"
      >
        {cellGroup.map((cell) => {
          return (
            <TableCell
              key={cell.id}
              cell={cell}
              style={style}
              className={className}
            />
          );
        })}
      </tr>

      {/* Sub Row */}
      {isRowExapnd && (
        <TableSubRow
          row={row}
          style={style}
          className={className}
          subRowStyle={subRowStyle}
          subRowHoverColor={subRowHoverColor}
        />
      )}
    </>
  );
};

export default TableBodyRow;

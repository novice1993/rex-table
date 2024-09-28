import { CSSProperties, useRef } from "react";
import { useTableContext } from "../../provider/TableProvider";

interface DefaultSubRowProps {
  rowIndex: number;
  contents: Array<object>;
  style?: CSSProperties;
  className?: string;
  subRowStyle?: CSSProperties;
}

const DefaultSubRow = (props: DefaultSubRowProps) => {
  const { rowIndex, contents, style, className, subRowStyle } = props;
  const key = useRef(0);
  const { subRowClickEvent, subRowCellClickEvent } = useTableContext();

  const handleClickSubRow = (e: React.MouseEvent<HTMLTableRowElement>) => {
    if (subRowClickEvent) {
      e.stopPropagation();
      subRowClickEvent();
    }
  };

  const handleClickSubRowCell = ({
    e,
    cellIndex,
    parentRowIndex,
    subRowIndex,
  }: {
    e: React.MouseEvent<HTMLTableCellElement>;
    cellIndex: number;
    parentRowIndex: number;
    subRowIndex: number;
  }) => {
    if (subRowCellClickEvent) {
      subRowCellClickEvent({ cellIndex, parentRowIndex, subRowIndex, e });
    }
  };

  return contents.map((content, subRowIndex) => {
    const values = Object.values(content as object);
    key.current += 1;

    return (
      <tr key={key.current} onClick={handleClickSubRow}>
        {values.map((value, cellIndex) => {
          return (
            <td
              key={value}
              style={{ ...style, ...subRowStyle }}
              className={className}
              onClick={(e) =>
                handleClickSubRowCell({
                  e,
                  cellIndex,
                  parentRowIndex: rowIndex,
                  subRowIndex,
                })
              }
            >
              {value}
            </td>
          );
        })}
      </tr>
    );
  });
};

export default DefaultSubRow;

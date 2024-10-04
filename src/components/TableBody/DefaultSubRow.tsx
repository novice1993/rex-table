import { CSSProperties, useRef } from "react";
import { useTableContext } from "../../provider/TableProvider";
import "../../style/style.css";

interface DefaultSubRowProps {
  rowIndex: number;
  contents: Array<object>;
  style?: CSSProperties;
  className?: string;
  subRowStyle?: CSSProperties;
  subRowHoverColor?: string;
}

const DefaultSubRow = (props: DefaultSubRowProps) => {
  const {
    rowIndex,
    contents,
    style,
    className,
    subRowStyle,
    subRowHoverColor,
  } = props;
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
      <tr
        key={key.current}
        className="subRow"
        style={
          {
            cursor: "default",
            backgroundColor: subRowStyle?.backgroundColor
              ? subRowStyle.backgroundColor
              : style?.backgroundColor,
            "--subRow-hover-color": `${subRowHoverColor}`,
          } as CSSProperties
        }
        onClick={handleClickSubRow}
      >
        {values.map((value, cellIndex) => {
          return (
            <td
              key={value}
              style={{
                ...style,
                ...subRowStyle,
                backgroundColor: "transparent",
              }}
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

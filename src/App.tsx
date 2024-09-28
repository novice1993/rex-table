import useTable from "./hook/useTable";

import { TableProvider } from "./provider/TableProvider";
import TableHeader from "./components/TableHeader/index";
import TableBody from "./components/TableBody/index";
import TableFooter from "./components/TableFooter";
import AddSubRow from "./components/SubRowComponents/AddSubRow";
import { ColumnDef, Row } from "@tanstack/react-table";

import { HeaderOptionType } from "./type/type";

export interface Example {
  No: number;
  firstName: string;
  add: string;
}

const dummyData: Array<Example> = [
  { No: 1, firstName: "kim", add: "-" },
  { No: 2, firstName: "kim", add: "-" },
  { No: 3, firstName: "kim", add: "-" },
  { No: 4, firstName: "kim", add: "-" },
  { No: 5, firstName: "kim", add: "-" },
  { No: 6, firstName: "kim", add: "-" },
  { No: 7, firstName: "kim", add: "-" },
  { No: 8, firstName: "kim", add: "-" },
  { No: 9, firstName: "kim", add: "-" },
  { No: 10, firstName: "kim", add: "-" },
  { No: 11, firstName: "kim", add: "-" },
  { No: 12, firstName: "kim", add: "-" },
  { No: 13, firstName: "kim", add: "-" },
  { No: 14, firstName: "kim", add: "-" },
  { No: 15, firstName: "kim", add: "-" },
  { No: 16, firstName: "kim", add: "-" },
  { No: 17, firstName: "kim", add: "-" },
  { No: 18, firstName: "kim", add: "-" },
  { No: 19, firstName: "kim", add: "-" },
  { No: 20, firstName: "kim", add: "-" },
  { No: 21, firstName: "kim", add: "-" },
  { No: 1, firstName: "kim", add: "-" },
  { No: 2, firstName: "kim", add: "-" },
  { No: 3, firstName: "kim", add: "-" },
  { No: 4, firstName: "kim", add: "-" },
  { No: 5, firstName: "kim", add: "-" },
  { No: 6, firstName: "kim", add: "-" },
  { No: 7, firstName: "kim", add: "-" },
  { No: 8, firstName: "kim", add: "-" },
  { No: 9, firstName: "kim", add: "-" },
  { No: 10, firstName: "kim", add: "-" },
  { No: 11, firstName: "kim", add: "-" },
  { No: 12, firstName: "kim", add: "-" },
  { No: 13, firstName: "kim", add: "-" },
  { No: 14, firstName: "kim", add: "-" },
  { No: 15, firstName: "kim", add: "-" },
  { No: 16, firstName: "kim", add: "-" },
  { No: 17, firstName: "kim", add: "-" },
  { No: 18, firstName: "kim", add: "-" },
  { No: 19, firstName: "kim", add: "-" },
  { No: 20, firstName: "kim", add: "-" },
  { No: 21, firstName: "kim", add: "-" },
  { No: 1, firstName: "kim", add: "-" },
  { No: 2, firstName: "kim", add: "-" },
  { No: 3, firstName: "kim", add: "-" },
  { No: 4, firstName: "kim", add: "-" },
  { No: 5, firstName: "kim", add: "-" },
  { No: 6, firstName: "kim", add: "-" },
  { No: 7, firstName: "kim", add: "-" },
  { No: 8, firstName: "kim", add: "-" },
  { No: 9, firstName: "kim", add: "-" },
  { No: 10, firstName: "kim", add: "-" },
  { No: 11, firstName: "kim", add: "-" },
  { No: 12, firstName: "kim", add: "-" },
  { No: 13, firstName: "kim", add: "-" },
  { No: 14, firstName: "kim", add: "-" },
  { No: 15, firstName: "kim", add: "-" },
  { No: 16, firstName: "kim", add: "-" },
  { No: 17, firstName: "kim", add: "-" },
  { No: 18, firstName: "kim", add: "-" },
  { No: 19, firstName: "kim", add: "-" },
  { No: 20, firstName: "kim", add: "-" },
  { No: 21, firstName: "kim", add: "-" },
  { No: 1, firstName: "kim", add: "-" },
  { No: 2, firstName: "kim", add: "-" },
  { No: 3, firstName: "kim", add: "-" },
  { No: 4, firstName: "kim", add: "-" },
  { No: 5, firstName: "kim", add: "-" },
  { No: 6, firstName: "kim", add: "-" },
  { No: 7, firstName: "kim", add: "-" },
  { No: 8, firstName: "kim", add: "-" },
  { No: 9, firstName: "kim", add: "-" },
  { No: 10, firstName: "kim", add: "-" },
  { No: 11, firstName: "kim", add: "-" },
  { No: 12, firstName: "kim", add: "-" },
  { No: 13, firstName: "kim", add: "-" },
  { No: 14, firstName: "kim", add: "-" },
  { No: 15, firstName: "kim", add: "-" },
  { No: 16, firstName: "kim", add: "-" },
  { No: 17, firstName: "kim", add: "-" },
  { No: 18, firstName: "kim", add: "-" },
  { No: 19, firstName: "kim", add: "-" },
  { No: 20, firstName: "kim", add: "-" },
  { No: 21, firstName: "kim", add: "-" },
  { No: 10, firstName: "kim", add: "-" },
  { No: 11, firstName: "kim", add: "-" },
  { No: 12, firstName: "kim", add: "-" },
  { No: 13, firstName: "kim", add: "-" },
  { No: 14, firstName: "kim", add: "-" },
  { No: 15, firstName: "kim", add: "-" },
  { No: 16, firstName: "kim", add: "-" },
  { No: 17, firstName: "kim", add: "-" },
  { No: 18, firstName: "kim", add: "-" },
  { No: 19, firstName: "kim", add: "-" },
  { No: 20, firstName: "kim", add: "-" },
  { No: 21, firstName: "kim", add: "-" },
  { No: 10, firstName: "kim", add: "-" },
  { No: 11, firstName: "kim", add: "-" },
  { No: 12, firstName: "kim", add: "-" },
  { No: 13, firstName: "kim", add: "-" },
];

const columns: ColumnDef<Example>[] = [
  {
    accessorKey: "No",
    header: "No",
    size: 10,
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 200,
    columns: [
      {
        accessorKey: "firstName",
        header: "First Name",
        size: 120,
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
        size: 120,
      },
    ],
  },
  {
    accessorKey: "add",
    header: "add",
    size: 100,
  },
];

const headerOption: HeaderOptionType[] = [
  { accessorKey: "No", layer: 1, colSpan: 1, rowSpan: 2 },
  { accessorKey: "name", layer: 1, colSpan: 2, rowSpan: 1 },
  { accessorKey: "firstName", layer: 2, colSpan: 1, rowSpan: 1 },
  { accessorKey: "lastName", layer: 2, colSpan: 1, rowSpan: 1 },
  { accessorKey: "add", layer: 1, colSpan: 1, rowSpan: 2 },
];

import style from "./style.module.css";

function App() {
  const { table, totalPageNum, pagination, setPagination } = useTable<Example>({
    data: dummyData,
    columns,
    isPagination: true,
  });

  const handleClickRow = (row: Row<unknown>) => {
    row.toggleExpanded();
  };

  return (
    <>
      <TableProvider
        SubRowComponent={AddSubRow}
        rowClickEvent={handleClickRow}
        useParentRowUi={true}
      >
        <TableHeader
          table={table}
          headerOptionType={headerOption}
          className={style.tableHeader}
        />
        <TableBody
          table={table}
          style={{
            border: "1px solid black",
            textAlign: "center",
          }}
        />
      </TableProvider>

      <TableFooter
        totalPageNum={totalPageNum}
        pagination={pagination}
        setPagination={setPagination}
      />
    </>
  );
}

export default App;

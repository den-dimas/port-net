import React from "react";
import ReactDOM from "react-dom/client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import Button from "../Button";
import { ChevronDownIcon } from "@radix-ui/react-icons";

interface DataTableProps {
  data: any[];
  column: ColumnDef<any>[];
}

export default function DataTable({ data, column }: DataTableProps) {
  const [columns] = React.useState<typeof column>(() => [...column]);
  const [columnVisibility, setColumnVisibility] = React.useState({});

  const rerender = React.useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
  });

  const headers = table.getHeaderGroups()[0].headers;

  return (
    <div className="w-full border-black border-2">
      <div className="">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={
                "flex items-center gap-2 bg-orange-main text-white font-bold px-2 py-1 relative z-0 " +
                "before:absolute before:w-full before:scale-x-0 before:origin-left before:h-full before:top-0 before:left-0 before:bg-black before:block before:-z-10 " +
                "before:ease-in-out before:duration-200 hover:before:scale-x-100 "
              }
            >
              Columns <ChevronDownIcon className="" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="bg-white border-2 border-black rounded-sm shadow-none"
          >
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize focus:bg-black focus:text-white cursor-pointer"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="h-4" />

      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
}

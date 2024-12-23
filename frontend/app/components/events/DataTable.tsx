import React from "react";
import ReactDOM from "react-dom/client";

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/DropdownMenu";
import Button from "../Button";
import { ChevronDownIcon } from "@radix-ui/react-icons";

interface DataTableProps {
  data: any[];
  column: ColumnDef<any>[];
}

export default function DataTable({ data, column }: DataTableProps) {
  const [columnVisibility, setColumnVisibility] = React.useState({});

  const columns = [...column];

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
    <div className="w-full border-black">
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

          <DropdownMenuContent align="end" className="bg-white border-2 border-black rounded-sm shadow-none">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize focus:bg-black focus:text-white cursor-pointer"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="h-4" />

      <table className="w-full border-2 border-black">
        <thead className="sticky top-0">
          {table.getHeaderGroups().map((headerGroup, i) => (
            <tr key={i}>
              {headerGroup.headers.map((header, j) => (
                <th key={j} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row, i) => (
            <tr key={i} className="max-h-2 overflow-y-scroll">
              {row.getVisibleCells().map((cell, j) => (
                <td key={j}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>

        <tfoot>
          {table.getFooterGroups().map((footerGroup, i) => (
            <tr key={i}>
              {footerGroup.headers.map((header, j) => (
                <th key={j} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
}


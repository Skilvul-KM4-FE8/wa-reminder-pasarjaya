"use client";

import * as React from "react";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable, SortingState, getSortedRowModel, ColumnFiltersState, getFilteredRowModel, Row } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSendWAStateModal } from "@/features/broadcast/hooks/use-push-customer-modal"; // ✅ benar

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  disabled?: boolean;
  onSend: (rows: Row<TData>[]) => void;
}

export function DataTable<TData, TValue>({ columns, data, disabled, onSend }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const { onOpen: openSendWADialog } = useSendWAStateModal();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const selectedRows = table.getSelectedRowModel().rows;
  const selectedCount = selectedRows.length;

  const handleSendMessage = () => {
    openSendWADialog(selectedRows); // ✅ kirim selected ke modal
  };

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <Input placeholder="Filter names..." value={(table.getColumn("name")?.getFilterValue() as string) || ""} onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)} className="max-w-sm" />

        {selectedCount > 0 && (
          <div className="flex gap-x-4 ml-4">
            {/* Tombol Delete - Belum Aktif */}
            <Button
              type="button"
              disabled={disabled}
              variant="destructive"
              className="transition"
              onClick={async () => {
                const confirmed = await confirm("Yakin ingin menghapus data yang dipilih?");
                if (confirmed) {
                  // Tambahkan logika delete di sini
                  // onDelete(selectedRows);
                }
              }}
            >
              Delete ({selectedCount})
            </Button>

            {/* Tombol Kirim WA */}
            <Button type="button" disabled={disabled} className="bg-gradient-to-b text-white from-[#7a77c4] to-[#6196A6]" onClick={handleSendMessage}>
              Kirim Pesan ke ({selectedCount}) item{selectedCount > 1 && "s"} orang
            </Button>
          </div>
        )}
      </div>

      {/* Tabel */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Navigasi Halaman */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  );
}

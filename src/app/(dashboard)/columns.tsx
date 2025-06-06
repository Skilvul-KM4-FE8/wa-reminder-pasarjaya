"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { format, differenceInMonths, isBefore, addMonths } from "date-fns";
import { id as localeID } from "date-fns/locale";
import { ActionCell } from "@/features/customer/components/actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Ruko = {
  id: string;
  name: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  address: string;
  contractDue: Date;
  shopBlock: string;
  shopNumber: string;
  shopSize: number;
  pasarName: string;
  reminders: {
    id: string;
    title: string;
    date: Date;
    clientId: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

export const columns: ColumnDef<Ruko>[] = [
  {
    id: "select",
    header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomeRowsSelected() && "indeterminate")} onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)} aria-label="ini aria label" />,
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row ini" />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "phone",
    header: () => <div className="text-left">Phone</div>,
    cell: ({ row }) => {
      // const amount = parseFloat(row.getValue("price"));
      // const formatted = new Intl.NumberFormat("id-ID", {
      //   style: "currency",
      //   currency: "IDR",
      //   minimumFractionDigits: 0,
      //   maximumFractionDigits: 0,
      // }).format(amount);

      return <div className="text-left font-medium">{row.getValue("phone")}</div>;
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Alamat
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "shopBlock",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Blok
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "shopNumber",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Nomor Ruko
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "shopSize",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Ukuran
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const size = row.getValue("shopSize");
      return ( <div className="text-left font-medium">{size as number}m<sup>2</sup></div> )
    }
  },
  {
    accessorKey: "contractDue",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Kontrak
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dueDate: Date = new Date(row.getValue("contractDue"));
      const now = new Date();
      const isNear = isBefore(dueDate, addMonths(now, 2));
      const monthsLeft = differenceInMonths(dueDate, now);
  
      return (
        <div className={isNear ? "text-red-600 font-semibold" : ""}>
          {format(dueDate, "dd MMMM yyyy", { locale: localeID })}
          <span className="text-lead text-sm">{monthsLeft < 0 ? " (Expired)" : monthsLeft === 0 ? " (Due this month)" : ` (${monthsLeft} bulan tersisa)` }</span>
        </div>
      );
    },
  },
  {
    accessorKey: "pasarName",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Pasar
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const ruko = row.original;

      // const deleteMutation = useDeleteMenu(payment.id!);
      // const [DialogConfirm] = useConfirm("Are you sure?", "you are about to delete this menu");

      // const handleDeleteMenu = async () => {
      //   const ok = await confirm();
      //   if (ok) {
      //     deleteMutation.mutate();
      //   }
      //   return null;
      // };

      return (
        <>
          <ActionCell ruko={ruko} />
        </>
      );
    },
  },
];

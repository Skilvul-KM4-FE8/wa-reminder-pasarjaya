"use client";

import { ColumnDef } from "@tanstack/react-table";

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
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "shopBlock",
    header: "Block",
  },
  {
    accessorKey: "shopNumber",
    header: "Number",
  },
  {
    accessorKey: "shopSize",
    header: "Size (m²)",
    cell: ({ row }) => `${row.original.shopSize} m²`,
  },
  {
    accessorKey: "contractDue",
    header: "Contract Due",
    cell: ({ row }) => new Date(row.original.contractDue).toLocaleDateString(),
  },
  {
    accessorKey: "pasarName",
    header: "Pasar",
  },
];

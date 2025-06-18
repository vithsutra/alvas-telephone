"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
 
  machine_id:string
  amount: number
  // status: "pending" | "processing" | "success" | "failed"
  date: string
  time:string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "machine_id",
    header: "Machine ID",
  },
  
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey:"time",
    header:"Time"
  }
]

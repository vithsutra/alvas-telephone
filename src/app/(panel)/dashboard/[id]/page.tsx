"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IndianRupee } from "lucide-react";
import { getRecharge } from "@/hooks/panel/machines/getHistory";
import { getExpense } from "@/hooks/panel/machines/getExpense";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { rechargeMachine } from "@/lib/panel/Machine/rechargeMachine";

export type History = {
  amount: number;
  timestamp: string;
};

function formatDateTime(timestamp: string) {
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();
  return { formattedDate, formattedTime };
}

const getColumns = (): ColumnDef<History>[] => [
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => `Rs. ${row.getValue("amount")}`,
  },
  {
    accessorKey: "timestamp",
    header: "Date",
    cell: ({ row }) => {
      const { formattedDate } = formatDateTime(row.getValue("timestamp"));
      return formattedDate;
    },
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => {
      const { formattedTime } = formatDateTime(row.getValue("timestamp"));
      return formattedTime;
    },
  },
];

export default function FinanceTabs() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = React.useState("recharge");
  const [openModal, setOpenModal] = React.useState(false);
  const [rechargeData, setRechargeData] = React.useState<History[]>([]);
  const [expenseData, setExpenseData] = React.useState<History[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [amount,setAmount] = React.useState<number>(0)

  async function handleAdd(e: React.InputHTMLAttributes<HTMLFormElement>) {
      try {
        setLoading(true)
        const response = await rechargeMachine(id as string, amount)
        if (response.message) {
          toast.success("Added successfully");
        }
      } catch (error) {
        console.log(error)
        toast.error("Error occured");
      }finally{
        setLoading(false) 
        setOpenModal(false)
        window.location.reload()
      }
  }

  const columns = React.useMemo(() => getColumns(), []);

  const data = activeTab === "recharge" ? rechargeData : expenseData;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
  });

  React.useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      const [recharge, expense] = await Promise.all([
        getRecharge({ id: id as string }),
        getExpense({ id: id as string }),
      ]);
      setRechargeData(recharge);
      setExpenseData(expense);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  return (
    <div className="w-full p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
        <TabsList>
          <TabsTrigger
            value="recharge"
            className={
              activeTab === "recharge"
                ? "bg-primary text-primary"
                : "bg-muted/10 text-muted-foreground"
            }
          >
            Recharge
          </TabsTrigger>
          <TabsTrigger
            value="expense"
            className={
              activeTab === "expense"
                ? "bg-primary text-primary"
                : "bg-muted/10 text-muted-foreground"
            }
          >
            Expense
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="rounded-md border">
        {loading ? (
          <div className="text-center p-4">Loading data...</div>
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-primary">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center">
                    No data found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <div className="flex justify-start items-center mt-4">
        <div className="flex justify-between gap-x-5">
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
        <Button
          onClick={() => setOpenModal(true)}
          className="absolute right-4 bottom-4"
        >
          <IndianRupee width={15} />
        </Button>
      </div>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="sm:max-w-sm ml-auto">
          <DialogHeader>
            <DialogTitle className="font-semibold">
              Enter the <span className="text-primary">amount</span>
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <input className="border p-2 rounded" placeholder="Amount" type="number"  onChange={(e) => setAmount(Number(e.target.value))} />
            <Button className="w-[30%] font-semibold text-sm" onClick={handleAdd}>{loading ? "Adding..." : "Add"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

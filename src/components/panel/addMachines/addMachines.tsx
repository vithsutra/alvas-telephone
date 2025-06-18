"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createMachine } from "@/lib/panel/Machine/createMachine";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AddMachines() {
  const [machineId, setmachineId] = useState("");
  const [machineName, setMachineName] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.InputHTMLAttributes<HTMLFormElement>) {
    try {
      setLoading(true)
      const response = await createMachine({
        machine_id: machineId,
        label: machineName,
      });
      if (response.message) {
        toast.success("Craeted successfully");
        setOpen(false);
      }
    } catch (error) {
      toast.error("Error occured");
      setOpen(false);
    }
    finally{
      setLoading(false)
      window.location.reload()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className=" absolute bottom-4 right-4 bg-primary hover:bg-blue-500 text-white hover:text-white rounded-full w-10 h-10 "
        >
          <Plus width={15} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-bold">
            Add <span className="text-primary">Machine</span>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid my-2">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="name"
              className="text-right font-normal justify-center items-center pb-2"
            >
              Id
            </Label>
            <Input
              id="name"
              type="text"
              value={machineId}
              placeholder="Machine Id"
              className="col-span-3"
              onChange={(e) => setmachineId(e.target.value)}
            />
            <Label
              htmlFor="name"
              className="text-right mt-4 justify-center items-center pb-4"
            >
              Name
            </Label>
            <Input
              id="name"
              type="text"
              value={machineName}
              placeholder="Machine Name"
              className="col-span-3"
              onChange={(e) => setMachineName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            className="bg -primary hover:bg-blue-500 text-white hover:text-white"
            type="submit"
            onClick={handleSubmit}
          >
            {loading ? "Creating..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

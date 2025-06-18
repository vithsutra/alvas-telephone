"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import AddMachines from "@/components/panel/addMachines/addMachines";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { getMachines } from "@/hooks/panel/machines/getMachines"; 
import { DeleteDialogInDropdown } from "@/components/panel/deleteMachines/alertDialof";

export interface Machine {
  id: string;
  label: string;
  machine_id: string;
  balance: number;
}

export default function Home() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMachines();
      setMachines(data);
    };
    fetchData();
  }, []);

  const handleManage = (id: string) => {
    router.push(`/dashboard/${id}`);
  };

  return (
    <div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {machines.map(({ id, label, machine_id, balance }) => (
          <Card
            className="w-full hover:bg-muted/10 shadow-md hover:scale-102 ease-in-out duration-300"
            key={id}
          >
            <CardHeader className="px-5">
              <CardTitle className="text-center text-md font-normal text-muted-foreground/80">
                {label}
              </CardTitle>
              <div className="text-center text-md font-medium text-yellow-500">
                {machine_id}
              </div>
            </CardHeader>
            <CardContent className="text-center text-2xl font-semibold text-primary">
              <span className="font-bold">Rs. {balance}</span>
            </CardContent>
            <CardFooter className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="text-sm w-8 h-8">
                    <Ellipsis />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleManage(machine_id)}>
                    Manage
                  </DropdownMenuItem>
                  <DeleteDialogInDropdown id={machine_id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        ))}
      </div>
      <AddMachines />
    </div>
  );
}

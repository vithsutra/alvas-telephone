"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // correct for App Router
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

interface Machine {
  name: string;
  id: string;
  admin: string;
}

export default function Machines({ slug }: { slug: string }) {
  const router = useRouter();
  const [machine, setMachine] = useState<Machine | null>(null);

  useEffect(() => {
    if (slug) {
      fetch(`/admin/machines/${slug}`)
        .then((res) => res.json())
        .then((data) => setMachine(data))
        .catch((error) => console.error("Error fetching machine:", error));
    }
  }, [slug]);

  if (!machine) return <p>Loading...</p>;

  async function handleDelete(machineId: string) {
    try {
      const response = await axios.post(
        `https://apmc.api.vsensetech.in/admin/machine/${machineId}`,
        {},
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        toast.success("Machine is Deleted!");
        setMachine(null);
      } else {
        toast.error("Something went wrong!", {
          description: "Please try again..",
        });
      }
    } catch (error: any) {
      toast.error("Delete Failed", {
        description: error.response?.data?.message || "Something went wrong!",
      });
    }
  }

  return (
    <div>
      <h1 className="h-full w-full">Machine Details</h1>
      <div>
        <h2>{machine.name}</h2>
        <h3>ID: {machine.id}</h3>

        <Button
          onClick={() => router.push(`/machines/?machine_id=${machine.id}`)}
        >
          Manage
        </Button>

        <Button onClick={() => handleDelete(machine.id)}>Delete</Button>
      </div>
    </div>
  );
}

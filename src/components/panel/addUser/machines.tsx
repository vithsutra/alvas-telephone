"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getUsers } from "@/hooks/panel/users/getUsers";
import { getMachines } from "@/hooks/panel/machines/getMachines";
import { useEffect, useState } from "react";
import { Machine } from "@/app/(panel)/dashboard/page";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export function MachinesDropDown() {
  const [open, setOpen] = useState(false);
    const [machines, setMachines] = useState<Machine[]>([]);
    const [value, setValue] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMachines();
      setMachines(data);
    };
    fetchData();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[220px] justify-between text-muted-foreground hover:text-muted-foreground"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select Machines..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {machines.map(({ machine_id }) => (
                <CommandItem
                  key={machine_id}
                  value={machine_id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {machine_id}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === machine_id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

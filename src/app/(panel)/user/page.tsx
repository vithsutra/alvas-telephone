"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddUser from "@/components/panel/addUser/addUser";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUsers } from "@/hooks/panel/users/getUsers";
import { DeleteUserDialog } from "@/components/panel/deleteUser/alertDeleteUser";

export interface User {
  user_id: string;
  machine_id: string;
  email: string;
  user_name: string;
}

export default function User() {
  const { users, error, loading } = getUsers();

  if (error || !users) {
    return (
      <div className="flex flex-col items-center justify-center text-2xl">
        No Users Found
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {users.map(({ user_id, user_name, machine_id, email }) => (
          <Card
            className="w-full hover:bg-muted/10 shadow-md ease-in-out duration-300"
            key={user_id}
          >
            <CardHeader className="py-4 flex flex-col items-center justify-center text-center">
              <CardTitle className="text-md font-normal text-muted-foreground/80">
                {user_name}
              </CardTitle>
              <div className="text-md font-medium text-yellow-500">
                {machine_id}
              </div>
            </CardHeader>

            <CardContent className="text-center text-lg font-normal text-primary break-words">
              <span className="font-bold">{email}</span>
            </CardContent>

            <CardFooter className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="text-sm w-8 h-8 p-0">
                    <Ellipsis size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DeleteUserDialog id={user_id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        ))}
      </div>

      <AddUser />
    </div>
  );
}

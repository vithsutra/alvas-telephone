"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUser } from "@/lib/panel/User/createUser";
import { User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AddUser() {
  const [user_name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [machine_id, setMachine_id] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleSubmit() {
    try {
      if (
        !user_name ||
        !email ||
        !password ||
        !machine_id ||
        !confirmPassword
      ) {
        toast.error("Please fill all the fields");
        return;
      }
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      setLoading(true);
      const response = await createUser({
        user_name,
        email,
        password,
        machine_id,
      });
      if (response) {
        toast.success("User created successfully");
        setName("");
        setEmail("");
        setPassword("");
        setMachine_id("");
        setConfirmPassword("");
        setOpen(false);
        window.location.reload();
      }
    } catch {
      toast.error("Something went wrong");
      setOpen(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className=" absolute bottom-4 right-4 bg-primary hover:bg-blue-500 text-white hover:text-white rounded-full w-10 h-10 "
        >
          <User width={15} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Add <span className="text-primary font-bold">User</span>
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-5">
          <div className="grid grid-cols-2 items-center gap-2 ">
            <Label htmlFor="name" className="text-right ">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Name"
              className="col-span-3"
              value={user_name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-2 ">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              className="col-span-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-2 ">
            <Label htmlFor="pasword" className="text-right">
              Password
            </Label>
            <Input
              id="pasword"
              type="password"
              placeholder="password"
              className="col-span-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-2 ">
            <Label htmlFor="confirmpasword" className="text-right">
              Confirm Password
            </Label>
            <Input
              id="confrmpassword"
              type="password"
              placeholder="password"
              className="col-span-3"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-2 ">
            <Label htmlFor="name" className="text-right ">
              Id
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Machine Id"
              className="col-span-3"
              value={machine_id}
              onChange={(e) => setMachine_id(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            className="bg -primary hover:bg-blue-500 text-white hover:text-white"
            type="submit"
            onClick={handleSubmit}
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

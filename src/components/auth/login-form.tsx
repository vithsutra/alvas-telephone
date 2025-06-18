"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleLogin } from "@/lib/authApi/login";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { setId } from "@/hooks/token/Id";
import { useState } from "react";
export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
    const router = useRouter();
    const [loading,setLoading] = useState(false);
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      setLoading(true);
      if (username && password) {
        const response = await handleLogin(username, password); 
        if (response.admin_id ) {
          toast.success("Login Successfully!", {
            description: "you have successfully logged in.",
          });
          setId(response.admin_id);
          router.push("/dashboard");  
        } else {
          toast.error("Login Failed", {
            description: "Invalid credentials or server issue.",
          });
        }
      }
    } catch (error: any) {
      toast.error("Login Error", {
        description: error.response?.data?.message || "Something went wrong", 
      });
    }
    finally {
      setLoading(false);
    }
  } 

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">
          Login to your <span className="text-primary">account</span>
        </h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your deatils below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="Username"
            name="username"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          {loading? "Loading..." : "Login"}
        </Button>
      </div>
    </form>
  );
}

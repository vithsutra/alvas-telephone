import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidbar/AppSidbar";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <main className="container p-4 ">
        <SidebarTrigger/>
        <div className=" p-3 pl-10">
        {children}
        </div>
      </main>
      {/* three dot logo /user /home /logout
      <Button >hello</Button> */}
    </SidebarProvider>
  );
}

export default layout;

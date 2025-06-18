"use client";
import { Home, Inbox, LogOut, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,      

  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { removeId } from "@/hooks/token/Id";

const items = [
  {
    title: "Dashbord",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "User",
    url: "/user",
    icon: Inbox,
  },
  {
    title: "Settings",
    url: "/setting",
    icon: Settings,
  },
];

export function AppSidebar() {
  const router = useRouter();

  function logout(){
    removeId()
    router.push("/login")
  }


  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row pt-7  items-baseline  pl-3.5 w-full space-x-2">
        <Image src="/logo.png" alt="logo" width={50} height={50} />
        <p>
          <span className="text-3xl font-bold tracking-tighter text-gray-600">VithSutra</span>
        </p>
      </SidebarHeader>
        <hr />

      <SidebarContent>
        <SidebarGroup>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
           
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
      <SidebarMenuButton className="bg-red-200   border border-red-300 hover:bg-red-300 duration-500" onClick={logout}>
          <div  className="flex gap-2 pl-1 items-center ">
            <LogOut width={15} />
            <span className="text-sm font-medium text-black">Logout</span>
          </div>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}

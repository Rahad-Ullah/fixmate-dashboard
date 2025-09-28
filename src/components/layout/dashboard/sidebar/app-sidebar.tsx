"use client";

import * as React from "react";

import { NavMain } from "@/components/layout/dashboard/sidebar/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { sidebarMenu } from "@/constants/dashboard-sidebar-menu";
import { LogOut } from "lucide-react";
import Modal from "@/components/modals/Modal";
import { Button } from "@/components/ui/button";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // const { logout } = useAuthContext();
  return (
    <Sidebar collapsible="none" variant="sidebar" {...props}>
      <SidebarContent>
        <NavMain items={sidebarMenu.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Modal
              dialogTrigger={
                <SidebarMenuButton className="text-white hover:text-red-500 hover:bg-transparent">
                  <LogOut />
                  Log out
                </SidebarMenuButton>
              }
              className="max-w-md"
              dialogTitle="Are You Sure To Log Out?"
            >
              <div className="flex gap-2 justify-center mt-8">
                <Button className="px-12" variant={"destructive"}>
                  Yes
                </Button>
                <Button className="px-12">No</Button>
              </div>
            </Modal>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
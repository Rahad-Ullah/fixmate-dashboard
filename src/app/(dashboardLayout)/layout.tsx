import NavUserWrapper from "@/components/layout/dashboard/navbar/nav-user-wrapper";
import { AppSidebar } from "@/components/layout/dashboard/sidebar/app-sidebar";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="no-scrollbar">
      {/* dashboard header */}
      <header className="flex h-24 py-2 bg-secondary-foreground border-b border-primary shadow-sm shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-20 sticky top-0 z-50">
        <div className="flex flex-nowrap items-center gap-2 px-4">
          {/* <SidebarTrigger className="xl:hidden -ml-1" /> */}
          <Link href={"/"} className="flex justify-center">
            <Image
              src={"/logo.png"}
              alt="logo"
              width={200}
              height={100}
              priority
              className="w-auto h-20 px-4"
            />
          </Link>
        </div>
        {/* searchbar */}
        <div className="flex justify-center items-center gap-4">
          {/* notification */}
          <Button
            variant={"ghost"}
            size={"icon"}
            className="text-[#008000] rounded-full"
          >
            <Bell />
          </Button>
          {/* user dropdown */}
          <NavUserWrapper />
        </div>
      </header>
      <div className="flex">
        {/* dashboard sidebar */}
        <AppSidebar className="p-4 pr-0 m-4 rounded-2xl" />
        <SidebarInset className="bg-transparent p-4 gap-4">
          {/* dashboard content */}
          <div className="rounded-xl flex-1">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import logo from "../assets/icons/3e_1.png";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Masterlists",
      url: "#",
      items: [
        {
          title: "Branches",
          url: "/admin/masterlists/branches",
          isActive: true,
        },
        {
          title: "Instructors",
          url: "/admin/masterlists/instructors",
        },
        {
          title: "Vehicles",
          url: "/admin/masterlists/vehicles",
        },
        {
          title: "Courses",
          url: "/admin/masterlists/courses",
        },
        {
          title: "Certificates",
          url: "/admin/masterlists/certificates",
        },
      ],
    },
    {
      title: "Operations",
      url: "#",
      items: [
        {
          title: "Students",
          url: "/admin/students",
        },
        {
          title: "Scheduling",
          url: "/admin/scheduling",
        },
        {
          title: "Payments",
          url: "/admin/payments",
        },
      ],
    },
    {
      title: "Reports",
      url: "#",
      items: [
        {
          title: "LTO Compliance",
          url: "/admin/reports/compliance",
        },
        {
          title: "Revenue",
          url: "/admin/reports/revenue",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="h-10 w-10 bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center">
                  <img src={logo} className="size-12" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">3E Driving School</span>
                  <span className="">San Jose City</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item?.isActive}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

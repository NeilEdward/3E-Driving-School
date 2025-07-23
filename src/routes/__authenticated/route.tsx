import { AppSidebar, navConfig } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { createFileRoute, Outlet, useRouter } from "@tanstack/react-router";
import * as React from "react";

// Helper to flatten nav data and find breadcrumb path
function findBreadcrumbPath(navMain: Array<any>, pathname: string) {
  for (const section of navMain) {
    if (section.items) {
      for (const item of section.items) {
        if (item.url === pathname) {
          return [section, item];
        }
      }
    }
  }
  // fallback: try to match section
  for (const section of navMain) {
    if (section.url === pathname) {
      return [section];
    }
  }
  return [];
}

export const Route = createFileRoute("/__authenticated")({
  component: AuthenticatedRouteLayout,
});

export default function AuthenticatedRouteLayout() {
  // Get current path from router
  const router = useRouter();
  const pathname = router.state.location.pathname;

  // Get nav data (from AppSidebar)
  // If AppSidebar exports data, use it. Otherwise, copy the navMain here.

  const breadcrumbPath = findBreadcrumbPath(navConfig.navMain, pathname);

  // Determine dynamic fallback label
  let fallbackLabel = "Dashboard";
  const isRoot =
    pathname === "/__authenticated" || pathname === "/__authenticated/";
  if (!isRoot && breadcrumbPath.length === 0) {
    // Get last segment of path, fallback to 'Page'
    const segments = pathname.split("/").filter(Boolean);
    fallbackLabel =
      segments.length > 0
        ? segments[segments.length - 1]
            .replace(/[-_]/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase())
        : "Page";
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbPath.length === 0 && (
                  <BreadcrumbItem>
                    <BreadcrumbPage>{fallbackLabel}</BreadcrumbPage>
                  </BreadcrumbItem>
                )}
                {breadcrumbPath.map((item, idx) => (
                  <React.Fragment key={item.title}>
                    <BreadcrumbItem>
                      {idx < breadcrumbPath.length - 1 ? (
                        <BreadcrumbLink href={item.url || "#"}>
                          {item.title}
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>{item.title}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                    {idx < breadcrumbPath.length - 1 && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

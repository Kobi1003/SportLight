import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UserCircle,
  BotMessageSquare,
  Trophy,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { SportlightLogo } from "../icons";
import { cn } from "@/lib/utils";

export function MainSidebar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <Sidebar collapsible="icon" side="left" variant="sidebar" className="border-r">
      <SidebarHeader className="h-16 justify-center">
        <SportlightLogo className="w-8 h-8 text-primary" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/dashboard" legacyBehavior passHref>
              <SidebarMenuButton
                asChild
                isActive={isActive("/dashboard")}
                tooltip={{ children: "Dashboard" }}
              >
                <a>
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </a>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/profile" legacyBehavior passHref>
              <SidebarMenuButton
                asChild
                isActive={isActive("/profile")}
                tooltip={{ children: "Profile" }}
              >
                <a>
                  <UserCircle />
                  <span>Profile</span>
                </a>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/tools" legacyBehavior passHref>
              <SidebarMenuButton
                asChild
                isActive={isActive("/tools")}
                tooltip={{ children: "AI Tools" }}
              >
                <a>
                  <BotMessageSquare />
                  <span>AI Tools</span>
                </a>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

"use client";

import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuIndicator,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { User, FileSpreadsheet, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { getUploadEvents } from "@/services/userApi";

export function MainNav() {
  const { isAdmin, isUser, loading, logout, refresh } = useAuth();
  const navigate = useNavigate();

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-wrap">
        {/* Dashboard */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Dashboard</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-3 p-4 md:w-[400px] lg:w-[500px]">
              <ListItem
                title="Overview"
                icon={<LayoutDashboard />}
                onClick={() => navigate("/dashboard")}
              >
                View analytics, activity, and system overview.
              </ListItem>
              <ListItem
                title="Reports"
                onClick={() => navigate("/upload-events")}
              >
                Data insights and performance reports.
              </ListItem>
              <ListItem
                title="Settings"
                onClick={() => navigate("/dashboard/settings")}
              >
                Configure admin settings and preferences.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(navigationMenuTriggerStyle(), "cursor-pointer")}
          >
            <a onClick={() => navigate("/upload-events")}>Reports</a>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(navigationMenuTriggerStyle(), "cursor-pointer")}
          >
            <a onClick={() => navigate("/books")}>Publishings</a>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {isAdmin && (
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={cn(navigationMenuTriggerStyle(), "cursor-pointer")}
            >
              <a onClick={() => navigate("/books/all")}>Publishings</a>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
        {isAdmin && (
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={cn(navigationMenuTriggerStyle(), "cursor-pointer")}
            >
              <a onClick={() => navigate("/upload-events/all")}>All Reports</a>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}

        {/* Users */}
        {isAdmin && (
          <NavigationMenuItem>
            <NavigationMenuTrigger>Users</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] gap-3 p-4 md:w-[400px]">
                <ListItem title="All Users" onClick={() => navigate("/users")}>
                  View and manage all registered users.
                </ListItem>

                <ListItem
                  title="Roles & Permissions"
                  onClick={() => navigate("/users/roles")}
                >
                  Manage user roles and access control.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}

        {/* Publishings */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Publishings</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-3 p-4 md:w-[400px]">
              <ListItem
                title="All Files"
                onClick={() => navigate("/publishings")}
              >
                Browse and manage user CSV or XLSX uploads.
              </ListItem>
              <ListItem title="Upload New" onClick={() => navigate("/upload")}>
                Upload a new publishing or data file.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Simple links */}
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(navigationMenuTriggerStyle(), "cursor-pointer")}
          >
            <a
              onClick={() => {
                getUploadEvents().then((res) => console.log(res));
              }}
            >
              Debugs
            </a>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

// 🧩 Small helper component
function ListItem({
  title,
  icon,
  children,
  onClick,
}: {
  title: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <li>
      <NavigationMenuLink
        asChild
        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <a onClick={onClick}>
          <div className="text-sm font-medium leading-none flex items-center gap-3">
            {icon}
            {title}
          </div>
          {children && (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          )}
        </a>
      </NavigationMenuLink>
    </li>
  );
}

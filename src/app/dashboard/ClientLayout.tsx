"use client";

import type React from "react";

import { useState } from "react";
import { Home, Gauge, BarChart3, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [activeItem, setActiveItem] = useState<string>("Home");

  const menuItems = [
    { label: "Home", icon: Home },
    { label: "Dashboard", icon: Gauge },
    { label: "Analytics", icon: BarChart3 },
    { label: "Settings", icon: Settings },
  ];

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full !bg-zinc-900">
        <Sidebar className="!border-cyan-500/30">
          <SidebarHeader className="border-b bg-zinc-900 border-cyan-500/30 px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-bold  text-cyan-400 font-mono">
                NEON
              </h1>
              {/* Mobile close button */}
              <SidebarTrigger className="md:hidden text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10" />
            </div>
          </SidebarHeader>

          <SidebarContent className="px-2 py-4">
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.label;

                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`
                        relative flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer
                        transition-all duration-300 group
                        ${
                          isActive
                            ? "!bg-zinc-900 !text-cyan-400"
                            : "text-cyan-400/70 hover:bg-cyan-500/10 hover:text-cyan-400"
                        }
                      `}
                      onClick={() => setActiveItem(item.label)}
                    >
                      <button className="w-full flex items-center gap-3">
                        {/* Active indicator bar */}
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-400 rounded-r" />
                        )}
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto flex flex-col">
          {/* Top bar with menu trigger for mobile */}
          <div className="md:hidden flex items-center gap-4 px-4 py-4 border-b border-cyan-500/30 bg-zinc-950">
            <SidebarTrigger className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10" />
            <h1 className="text-lg font-bold text-cyan-400 font-mono">NEON</h1>
          </div>

          {/* Page content wrapper */}
          <div className="flex-1 overflow-auto">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}

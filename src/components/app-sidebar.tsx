"use client";

import { type ReactNode, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface SidebarItem {
  label: string;
  icon: ReactNode;
  active?: boolean;
  onClick?: () => void;
}

interface NeonSidebarProps {
  items: SidebarItem[];
  className?: string;
}

export function AppSidebar({ items, className }: NeonSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden h-full fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-cyan-400 hover:text-cyan-300 hover:bg-zinc-900"
        >
          {isCollapsed ? (
            <Menu className="w-5 h-5" />
          ) : (
            <X className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:relative md:block",
          "left-0 top-0 h-screen w-64 md:w-auto",
          "bg-zinc-950 border-r border-cyan-500/20",
          "transition-all duration-300 ease-in-out",
          "md:flex md:flex-col md:w-64 md:translate-x-0",
          isCollapsed ? "-translate-x-full" : "translate-x-0",
          className
        )}
      >
        {/* Header */}
        <div className="p-6 border-b border-cyan-500/20">
          <h2 className="text-xl font-bold text-cyan-400 text-balance">Menu</h2>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto scrollbar-hide p-4">
          <div className="space-y-2">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.onClick?.();
                  setIsCollapsed(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg",
                  "text-left text-sm font-medium",
                  "transition-all duration-200",
                  "relative group",
                  item.active
                    ? "bg-zinc-900 text-cyan-400 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-cyan-400 before:rounded-r"
                    : "text-cyan-400/80 hover:text-cyan-300 hover:bg-zinc-900/50"
                )}
              >
                {/* Icon */}
                <div className="flex-shrink-0 flex items-center justify-center w-5 h-5">
                  {item.icon}
                </div>

                {/* Label */}
                <span className="flex-1">{item.label}</span>

                {/* Glow effect on active */}
                {item.active && (
                  <div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      boxShadow: "0 0 20px rgba(34, 211, 238, 0.2)",
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-cyan-500/20 p-4">
          <div className="text-xs text-cyan-400/50 text-center">
            Neon Sidebar v1.0
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isCollapsed === false && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </>
  );
}

export type { NeonSidebarProps };

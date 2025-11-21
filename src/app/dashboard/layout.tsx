import authRoutes from "@/modules/auth/auth.route";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { getSession } from "@/modules/auth/utils/auth-utils";
import { redirect } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { ReactNode } from "react";
export default async function LayoutDashboard({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect(authRoutes.login);
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className="fixed left-[20%]" />
      <main className="w-full">
        <div className="w-full mx-auto py-8 px-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}

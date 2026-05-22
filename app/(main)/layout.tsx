import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { getCurrentProfile } from "@/lib/queries/profile";
import { createClient } from "@/lib/supabase/server";

export default async function MainLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const profile = user ? await getCurrentProfile(user.id) : null;

  const userEmail = user?.email ?? "";
  const userName = profile?.name ?? userEmail.split("@")[0];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar userName={userName} userEmail={userEmail} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar userName={userName} userEmail={userEmail} />
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}

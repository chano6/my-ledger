import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { getCurrentProfile } from "@/lib/queries/profile";
import { createClient } from "@/lib/supabase/server";

export default async function MainLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const profile = await getCurrentProfile();

  const userEmail = user?.email ?? "";
  const userName = profile?.name ?? userEmail.split("@")[0];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar userName={userName} userEmail={userEmail} />
      <main className="flex min-w-0 flex-1 flex-col md:overflow-y-auto">{children}</main>
    </div>
  );
}

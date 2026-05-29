import type { ReactNode } from "react";
import { MobileBottomTabs } from "@/components/layout/mobile-bottom-tabs";
import { MobileFab } from "@/components/layout/mobile-fab";
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
    <div className="flex min-h-screen bg-background md:h-screen">
      {/* 데스크탑 사이드바 */}
      <Sidebar userName={userName} userEmail={userEmail} />

      {/* 메인 콘텐츠 */}
      <main className="flex min-w-0 flex-1 flex-col pb-20 md:overflow-y-auto md:pb-0">
        {children}
      </main>

      {/* 모바일 전용 */}
      <MobileBottomTabs />
      <MobileFab />
    </div>
  );
}

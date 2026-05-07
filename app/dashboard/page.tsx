import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";

async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="container mx-auto max-w-4xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Ledger</h1>
          <p className="mt-1 text-muted-foreground">안녕하세요, {user?.email}님 👋</p>
        </div>

        <form action={logout}>
          <Button type="submit" variant="outline">
            로그아웃
          </Button>
        </form>
      </div>

      <div className="rounded-lg border p-6">
        <h2 className="mb-2 text-xl font-semibold">대시보드</h2>
        <p className="text-muted-foreground">여기에 거래 내역과 통계가 표시될 예정입니다.</p>
      </div>
    </div>
  );
}

export default DashboardPage;

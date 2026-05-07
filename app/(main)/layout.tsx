import Link from "next/link";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions/auth";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {/* 헤더 */}
      <header className="border-b">
        <div className="container mx-auto flex max-w-4xl items-center justify-between p-4">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-xl font-bold">
              My Ledger
            </Link>
            <nav className="flex gap-4">
              <Link
                href="/dashboard"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                대시보드
              </Link>
              <Link
                href="/transactions"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                거래 내역
              </Link>
            </nav>
          </div>
          <form action={logout}>
            <Button type="submit" variant="outline" size="sm">
              로그아웃
            </Button>
          </form>
        </div>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className="container mx-auto max-w-4xl p-8">{children}</main>
    </div>
  );
}

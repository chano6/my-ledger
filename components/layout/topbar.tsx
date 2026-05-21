import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions/auth";

export function Topbar() {
  return (
    <header className="flex items-center gap-4 border-b border-border bg-background px-4 py-4 lg:px-8">
      <div className="flex-1" />

      <div className="flex items-center gap-2">
        <form action={logout}>
          <Button variant="ghost" size="sm">
            로그아웃
          </Button>
        </form>
      </div>
    </header>
  );
}

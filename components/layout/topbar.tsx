import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions/auth";
import { MobileSidebar } from "./mobile-sidebar";

type TopbarProps = {
  userEmail: string;
};

export function Topbar({ userEmail }: TopbarProps) {
  return (
    <header className="flex items-center gap-4 border-b border-border bg-background px-4 py-4 md:px-8">
      <MobileSidebar userEmail={userEmail} />

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

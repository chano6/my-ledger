import type { ReactNode } from "react";
import { MobileSidebar } from "../layout/mobile-sidebar";

type PageHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  userName?: string;
  userEmail?: string;
};

export async function PageHeader({
  title,
  description,
  action,
  userName = "",
  userEmail = "",
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-3 border-b border-border px-4 py-5 md:flex-row md:items-start md:justify-between md:gap-4 md:px-8">
      <div className="md:hidden">
        <MobileSidebar userName={userName} userEmail={userEmail} />
      </div>

      <div className="space-y-1">
        <h1 className="text-[22px] font-bold tracking-tight">{title}</h1>
        {description && <p className="text-sm text-fg-soft">{description}</p>}
      </div>

      {action && <div className="flex shrink-0 items-center gap-2">{action}</div>}
    </div>
  );
}

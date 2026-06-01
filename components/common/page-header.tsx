import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="hidden flex-col gap-3 border-b border-border px-4 py-5 md:flex md:flex-row md:items-start md:justify-between md:gap-4 md:px-8">
      <div className="space-y-1">
        <h1 className="text-[22px] font-bold tracking-tight">{title}</h1>
        {description && <p className="text-sm text-fg-soft">{description}</p>}
      </div>

      {action && <div className="flex shrink-0 items-center gap-2">{action}</div>}
    </div>
  );
}

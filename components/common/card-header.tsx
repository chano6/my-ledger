import type { ReactNode } from "react";

type CardHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function CardHeader({ title, description, action }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-2">
      <div className="space-y-1">
        <h3 className="text-[15px] font-bold tracking-tight">{title}</h3>
        {description && <p className="text-[12px] text-fg-soft">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

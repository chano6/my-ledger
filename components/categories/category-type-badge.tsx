import { cn } from "@/lib/utils";

type CategoryTypeBadgeProps = {
  isIncome: boolean;
  color: string;
};

export function CategoryTypeBadge({ isIncome, color }: CategoryTypeBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold",
        isIncome ? "bg-sage-soft text-sage-deep" : "bg-bg-sunken text-fg-muted",
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
      {isIncome ? "수입" : "지출"}
    </span>
  );
}

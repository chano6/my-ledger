import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

type TypeButtonsProps = {
  value: "income" | "expense";
  onChange: (value: "income" | "expense") => void;
};

export function TypeButtons({ value, onChange }: TypeButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <TypeButton
        active={value === "expense"}
        onClick={() => onChange("expense")}
        icon={TrendingDown}
        label="지출"
        activeClassName="border-coral-soft bg-coral-soft/40 text-coral"
      />
      <TypeButton
        active={value === "income"}
        onClick={() => onChange("income")}
        icon={TrendingUp}
        label="수입"
        activeClassName="border-sage-soft bg-sage-soft/40 text-sage-deep"
      />
    </div>
  );
}

function TypeButton({
  active,
  onClick,
  icon: Icon,
  label,
  activeClassName,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  activeClassName: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border-2 py-3 text-[14px] font-semibold transition-all",
        active ? activeClassName : "border-border bg-card text-fg-muted hover:border-border-strong",
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}

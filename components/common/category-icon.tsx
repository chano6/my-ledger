import { getCategoryIcon } from "@/lib/category-icons";
import { cn } from "@/lib/utils";

type CategoryIconProps = {
  icon: string;
  color: string;
  size?: "sm" | "md" | "lg";
};

const SIZE_STYLES = {
  sm: {
    container: "h-7 w-7 rounded-[9px]",
    icon: "h-3.5 w-3.5",
  },
  md: {
    container: "h-9 w-9 rounded-[11px]",
    icon: "h-4 w-4",
  },
  lg: {
    container: "h-11 w-11 rounded-[12px]",
    icon: "h-5 w-5",
  },
};

export function CategoryIcon({ icon, color, size = "md" }: CategoryIconProps) {
  const Icon = getCategoryIcon(icon);
  const styles = SIZE_STYLES[size];

  return (
    <div
      className={cn("flex shrink-0 items-center justify-center", styles.container)}
      style={{
        backgroundColor: `${color}1F`, // 카테고리 색 + 12% 알파
        color: color,
      }}
    >
      <Icon className={styles.icon} strokeWidth={2} />
    </div>
  );
}

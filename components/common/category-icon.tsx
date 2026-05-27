import { cn } from "@/lib/utils";

type CategoryIconProps = {
  name: string;
  color: string;
  size?: "sm" | "md" | "lg";
};

const SIZE_CLASSES = {
  sm: "h-7 w-7 text-[11px]",
  md: "h-9 w-9 text-[14px]",
  lg: "h-11 w-11 text-[16px]",
};

export function CategoryIcon({ name, color, size = "md" }: CategoryIconProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-sm font-semibold",
        SIZE_CLASSES[size],
      )}
      style={{
        backgroundColor: `${color}1F`, // 12% 불투명도
        color: color,
      }}
    >
      {name[0]?.toUpperCase() ?? "?"}
    </div>
  );
}

"use client";

import { CATEGORY_ICON_LABELS, CATEGORY_ICONS, type CategoryIconKey } from "@/lib/category-icons";
import { cn } from "@/lib/utils";

type IconPickerProps = {
  value: CategoryIconKey;
  onChange: (icon: CategoryIconKey) => void;
};

export function IconPicker({ value, onChange }: IconPickerProps) {
  return (
    <div className="grid grid-cols-8 gap-2">
      {Object.entries(CATEGORY_ICONS).map(([key, Icon]) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key as CategoryIconKey)}
          className={cn(
            "flex cursor-pointer h-9 w-9 items-center justify-center rounded-md transition-colors",
            value === key
              ? "border-2 border-peach-deep bg-peach-soft text-peach-deep"
              : "border border-border bg-card text-fg-muted hover:border-border-strong hover:text-fg",
          )}
          title={CATEGORY_ICON_LABELS[key as CategoryIconKey]}
          aria-label={CATEGORY_ICON_LABELS[key as CategoryIconKey]}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  );
}

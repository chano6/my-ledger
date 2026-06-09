"use client";

import { Check } from "lucide-react";
import { CATEGORY_COLORS } from "@/lib/category-icons";
import { cn } from "@/lib/utils";

type ColorPickerProps = {
  value: string;
  onChange: (color: string) => void;
};

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="grid grid-cols-8 gap-2">
      {CATEGORY_COLORS.map((color) => (
        <button
          key={color}
          type="button"
          onClick={() => onChange(color)}
          className={cn(
            "relative cursor-pointer h-9 w-9 rounded-full transition-transform",
            value === color ? "ring-2 ring-offset-2 ring-peach-deep scale-105" : "hover:scale-110",
          )}
          style={{ backgroundColor: color }}
          aria-label={`색상 ${color}`}
        >
          {value === color && (
            <Check className="absolute inset-0 m-auto h-4 w-4 text-white" strokeWidth={3} />
          )}
        </button>
      ))}
    </div>
  );
}

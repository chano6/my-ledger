"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Category } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type CategoryFilterProps = {
  categories: Category[];
  currentCategoryId?: string;
};

export function CategoryFilter({ categories, currentCategoryId }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }

    const queryString = params.toString();
    router.push(`/transactions${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <Select value={currentCategoryId ?? "all"} onValueChange={handleChange}>
      <SelectTrigger className="w-45">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">전체 카테고리</SelectItem>
        {categories.map((category) => (
          <SelectItem key={category.id} value={category.id}>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }} />
              {category.name}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type SearchInputProps = {
  currentSearch?: string;
};

export function SearchInput({ currentSearch }: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(currentSearch ?? "");

  useEffect(() => {
    setValue(currentSearch ?? "");
  }, [currentSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      const trimmed = value.trim();

      const currentSearchInUrl = params.get("search") ?? "";
      if (trimmed === currentSearchInUrl) {
        return;
      }

      if (trimmed) {
        params.set("search", trimmed);
      } else {
        params.delete("search");
      }

      params.delete("limit");

      const queryString = params.toString();
      const newUrl = `/transactions${queryString ? `?${queryString}` : ""}`;

      const currentUrl = `/transactions${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
      if (newUrl !== currentUrl) {
        router.push(newUrl, { scroll: false });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [value, router, searchParams]);

  return (
    <div className="relative">
      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-fg-soft" />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="거래 검색..."
        className="h-10 w-full rounded-sm border border-border bg-card pl-9 pr-3 text-sm placeholder:text-fg-soft focus:border-peach-deep focus:outline-none focus:ring-2 focus:ring-peach-deep/15 lg:w-65"
      />
    </div>
  );
}

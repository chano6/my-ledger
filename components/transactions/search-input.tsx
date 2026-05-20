"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

type SearchInputProps = {
  currentSearch?: string;
};

export function SearchInput({ currentSearch }: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(currentSearch ?? "");

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      const trimmed = value.trim();
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
    <Input
      type="text"
      placeholder="메모 검색..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-60"
    />
  );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

type LoadMoreButtonProps = {
  currentLimit: number;
  pageSize: number;
};

export function LoadMoreButton({ currentLimit, pageSize }: LoadMoreButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLoadMore = () => {
    const params = new URLSearchParams(searchParams.toString());
    const newLimit = currentLimit + pageSize;

    params.set("limit", newLimit.toString());
    router.push(`/transactions?${params.toString()}`, { scroll: false });
  };

  return (
    <Button variant="outline" onClick={handleLoadMore}>
      더 보기 ({pageSize}개)
    </Button>
  );
}

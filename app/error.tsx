"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 개발 중엔 콘솔 로그
    console.error("Application error:", error);

    // 프로덕션: Sentry 등 에러 트래킹 서비스에 전송
    // captureException(error)
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-coral-soft">
        <AlertTriangle className="h-10 w-10 text-coral" strokeWidth={1.5} />
      </div>

      <h1 className="mb-2 text-[28px] font-bold tracking-tight text-fg">문제가 발생했어요</h1>
      <p className="mb-8 max-w-md text-[14px] text-fg-muted">
        잠시 후 다시 시도해주세요. 문제가 계속되면 새로고침해주세요.
      </p>

      {/* 에러 디테일 (개발 환경) */}
      {process.env.NODE_ENV === "development" && (
        <div className="mb-6 max-w-lg rounded-lg bg-bg-sunken p-3 text-left">
          <p className="font-mono text-[11px] text-fg-soft">{error.message}</p>
          {error.digest && (
            <p className="mt-1 font-mono text-[11px] text-fg-soft">Digest: {error.digest}</p>
          )}
        </div>
      )}

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button onClick={reset} className="cursor-pointer rounded-[9px]">
          <RefreshCw className="h-4 w-4" />
          다시 시도
        </Button>
        <Button asChild className="cursor-pointer rounded-[9px]" variant="outline">
          <Link href="/dashboard">대시보드로 가기</Link>
        </Button>
      </div>
    </div>
  );
}

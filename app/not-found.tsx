import { FileQuestion } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      {/* 아이콘 */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-bg-sunken">
        <FileQuestion className="h-10 w-10 text-fg-soft" strokeWidth={1.5} />
      </div>

      {/* 메시지 */}
      <h1 className="mb-2 text-[28px] font-bold tracking-tight text-fg">페이지를 찾을 수 없어요</h1>
      <p className="mb-8 max-w-md text-[14px] text-fg-muted">
        주소가 잘못되었거나 페이지가 삭제되었을 수 있어요.
      </p>

      {/* 액션 */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button asChild className="cursor-pointer rounded-[9px]">
          <Link href="/dashboard">대시보드로 가기</Link>
        </Button>
        <Button asChild className="cursor-pointer rounded-[9px]" variant="outline">
          <Link href="/">처음으로</Link>
        </Button>
      </div>
    </div>
  );
}

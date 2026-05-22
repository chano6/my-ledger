"use client";

import Link from "next/link";
import { useActionState } from "react";
import { ErrorMessage } from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { login } from "@/lib/actions/auth";
import { GoogleIcon, KakaoIcon } from "./social-icons";

export function LoginForm() {
  const [state, formAction] = useActionState(login, null);

  return (
    <div className="flex w-full max-w-100 flex-col gap-7">
      {/* 헤더 */}
      <div className="space-y-2">
        <h1 className="text-[26px] font-bold leading-tight tracking-tight">다시 만나서 반가워요</h1>
        <p className="text-sm text-fg-soft">이메일과 비밀번호로 로그인하세요.</p>
      </div>

      {/* 폼 */}
      <form action={formAction} className="flex flex-col gap-4" noValidate>
        <ErrorMessage message={state?.error} />

        {/* 이메일 */}
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-semibold text-fg-muted">
            이메일
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            className="h-11"
          />
        </div>

        {/* 비밀번호 */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-xs font-semibold text-fg-muted">
              비밀번호
            </Label>
            <button
              type="button"
              className="text-xs cursor-pointer text-peach-deep/70 transition-colors hover:text-peach-deep"
              onClick={() => alert("준비 중입니다.")}
            >
              비밀번호 찾기
            </button>
          </div>
          <Input id="password" name="password" type="password" required className="h-11" />
        </div>

        {/* 자동 로그인 */}
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            name="remember"
            className="h-4 w-4 rounded border-border cursor-pointer accent-peach-deep"
            defaultChecked
          />
          <span className="text-xs text-fg-muted">자동 로그인</span>
        </label>

        {/* 로그인 버튼 */}
        <SubmitButton className="h-11 w-full cursor-pointer" pendingLabel="로그인 중...">
          로그인
        </SubmitButton>
      </form>

      {/* 구분선 */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-3 text-xs text-fg-soft">또는</span>
        </div>
      </div>

      {/* 소셜 로그인 */}
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => alert("카카오 로그인 준비 중입니다.")}
          className="flex cursor-pointer h-11 w-full items-center justify-center gap-2 rounded-md border border-border bg-card text-sm font-semibold transition-colors hover:bg-bg-sunken"
        >
          <KakaoIcon className="h-4 w-4 text-[#3C1E1E]" />
          카카오로 계속하기
        </button>
        <button
          type="button"
          onClick={() => alert("구글 로그인 준비 중입니다.")}
          className="flex cursor-pointer h-11 w-full items-center justify-center gap-2 rounded-md border border-border bg-card text-sm font-semibold transition-colors hover:bg-bg-sunken"
        >
          <GoogleIcon className="h-4 w-4" />
          Google로 계속하기
        </button>
      </div>

      {/* 회원가입 링크 */}
      <p className="text-center text-sm text-fg-soft">
        아직 ledger 계정이 없으신가요?{" "}
        <Link href="/signup" className="font-semibold text-peach-deep hover:underline">
          회원가입
        </Link>
      </p>
    </div>
  );
}

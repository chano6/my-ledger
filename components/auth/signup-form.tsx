"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { ErrorMessage } from "@/components/common/error-message";
import { SubmitButton } from "@/components/common/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from "@/lib/actions/auth";
import { GoogleIcon, KakaoIcon } from "./social-icons";

function getPasswordStrength(password: string): {
  level: 0 | 1 | 2 | 3 | 4;
  label: string;
} {
  if (!password) return { level: 0, label: "" };
  let level = 0;
  if (password.length >= 8) level++;
  if (/[A-Z]/.test(password)) level++;
  if (/[0-9]/.test(password)) level++;
  if (/[^a-zA-Z0-9]/.test(password)) level++;

  const labels = ["약함", "약함", "보통", "안전", "강력"];
  return { level: level as 0 | 1 | 2 | 3 | 4, label: labels[level] };
}

export function SignupForm() {
  const [state, formAction] = useActionState(signup, null);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const strength = getPasswordStrength(password);

  const isMatch = passwordConfirm.length > 0 && password === passwordConfirm;
  const isMismatch = passwordConfirm.length > 0 && password !== passwordConfirm;

  return (
    <div className="flex w-full max-w-100 flex-col gap-7">
      {/* 헤더 */}
      <div className="space-y-2">
        <h1 className="text-[26px] font-bold leading-tight tracking-tight">ledger 시작하기</h1>
        <p className="text-sm text-fg-soft">30초면 충분해요. 따뜻한 가계부 여정을 시작해 보세요.</p>
      </div>

      {/* 폼 */}
      <form action={formAction} className="flex flex-col gap-4" noValidate>
        <ErrorMessage message={state?.error} />

        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-xs font-semibold text-fg-muted">
            이름
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="홍길동"
            required
            maxLength={20}
            className="h-11"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-semibold text-fg-muted">
            이메일
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="hello@ledger.app"
            required
            className="h-11"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-xs font-semibold text-fg-muted">
            비밀번호
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="영문·숫자·특수문자 포함 8자 이상"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11"
          />
          {/* 강도 표시 */}
          {password && (
            <div className="space-y-1 pt-1">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      i <= strength.level
                        ? strength.level <= 1
                          ? "bg-coral"
                          : strength.level === 2
                            ? "bg-butter"
                            : strength.level === 3
                              ? "bg-sage"
                              : "bg-sage-deep"
                        : "bg-border"
                    }`}
                  />
                ))}
              </div>
              <div className="text-right text-[11px] text-fg-soft">{strength.label}</div>
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="passwordConfirm" className="text-xs font-semibold text-fg-muted">
            비밀번호 확인
          </Label>
          <Input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            required
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="h-11"
          />
          {isMismatch && <p className="text-[11px] text-coral">비밀번호가 일치하지 않습니다.</p>}
          {isMatch && <p className="text-[11px] text-sage-deep">✓ 비밀번호가 일치합니다.</p>}
        </div>

        <SubmitButton className="h-11 w-full cursor-pointer" pendingLabel="가입 중...">
          회원가입
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
          className="flex h-11 cursor-pointer w-full items-center justify-center gap-2 rounded-md border border-border bg-card text-sm font-semibold transition-colors hover:bg-bg-sunken"
        >
          <KakaoIcon className="h-4 w-4 text-[#3C1E1E]" />
          카카오로 계속하기
        </button>
        <button
          type="button"
          onClick={() => alert("구글 로그인 준비 중입니다.")}
          className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-card text-sm font-semibold transition-colors hover:bg-bg-sunken"
        >
          <GoogleIcon className="h-4 w-4" />
          Google로 계속하기
        </button>
      </div>

      {/* 로그인 링크 */}
      <p className="text-center text-sm text-fg-soft">
        이미 계정이 있으신가요?{" "}
        <Link href="/login" className="font-semibold text-peach-deep hover:underline">
          로그인
        </Link>
      </p>
    </div>
  );
}

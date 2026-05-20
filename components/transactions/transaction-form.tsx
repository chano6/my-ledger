"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { SubmitButton } from "@/components/ui/submit-button";
import type { ActionState, Category, Transaction, TransactionType } from "@/lib/types";
import { Button } from "../ui/button";
import { ErrorMessage } from "../ui/error-message";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

type TransactionFormProps = {
  categories: Category[];
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  defaultValues?: Transaction;
  submitLabel?: string;
};

export function TransactionForm({
  categories,
  action,
  defaultValues,
  submitLabel = "저장",
}: TransactionFormProps) {
  const [state, formAction] = useActionState(action, null);

  // 현재 선택된 유형 (지출/수입) 상태 관리
  const [type, setType] = useState<TransactionType>(defaultValues?.type ?? "expense");

  // 선택된 유형에 맞는 카테고리 필터링
  const filteredCategories = categories.filter((c) => c.type === type);

  // 오늘 날짜
  const today = new Date().toISOString().split("T")[0];

  return (
    <form action={formAction} className="max-w-md space-y-4" noValidate>
      {defaultValues && <input type="hidden" name="id" value={defaultValues.id} />}

      <ErrorMessage message={state?.error} />

      {/* 수입/지출 선택 */}
      <div className="grid gap-2">
        <Label htmlFor="type">유형</Label>
        <Select
          name="type"
          value={type}
          onValueChange={(value) => setType(value as TransactionType)}
        >
          <SelectTrigger id="type">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="expense">지출</SelectItem>
            <SelectItem value="income">수입</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 금액 */}
      <div className="grid gap-2">
        <Label htmlFor="amount">금액</Label>
        <Input
          id="amount"
          name="amount"
          type="number"
          placeholder="0"
          min="1"
          required
          defaultValue={defaultValues?.amount}
        />
      </div>

      {/* 카테고리 (필터링된 카테고리만 표시) */}
      <div className="grid gap-2">
        <Label htmlFor="category">카테고리</Label>
        <Select name="category_id" required defaultValue={defaultValues?.category_id ?? undefined}>
          <SelectTrigger id="category">
            <SelectValue placeholder="카테고리 선택" />
          </SelectTrigger>
          <SelectContent>
            {filteredCategories.length === 0 ? (
              <SelectItem value="empty" disabled>
                카테고리가 없습니다
              </SelectItem>
            ) : (
              filteredCategories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  <span className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    {category.name}
                  </span>
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      {/* 날짜 */}
      <div className="grid gap-2">
        <Label htmlFor="date">날짜</Label>
        <Input
          id="date"
          name="date"
          type="date"
          defaultValue={defaultValues?.date ?? today}
          required
        />
      </div>

      {/* 메모 */}
      <div className="grid gap-2">
        <Label htmlFor="description">메모 (선택)</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="거래 내용을 입력하세요"
          rows={3}
          defaultValue={defaultValues?.description ?? ""}
        />
      </div>

      <div className="flex gap-2 pt-4">
        <SubmitButton className="flex-1" pendingLabel={defaultValues ? "수정 중..." : "저장 중..."}>
          {submitLabel}
        </SubmitButton>
        <Button type="button" variant="outline" asChild>
          <Link href="/transactions">취소</Link>
        </Button>
      </div>
    </form>
  );
}

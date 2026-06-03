"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createTransaction, updateTransaction } from "@/lib/actions/transactions";
import { toDateString } from "@/lib/format";
import type { Category, TransactionWithCategory } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AmountInput } from "./amount-input";
import { DatePicker } from "./date-picker";
import { TypeButtons } from "./type-buttons";

type TransactionFormProps = {
  transaction?: TransactionWithCategory;
  categories: Category[];
  onSuccess: () => void;
  onCancel: () => void;
};

export function TransactionForm({
  transaction,
  categories,
  onSuccess,
  onCancel,
}: TransactionFormProps) {
  const isEdit = !!transaction;

  // 폼 상태
  const [type, setType] = useState<"income" | "expense">(transaction?.type ?? "expense");
  const [amount, setAmount] = useState(transaction?.amount.toString() ?? "");
  const [date, setDate] = useState(transaction?.date ?? toDateString(new Date()));
  const [categoryId, setCategoryId] = useState(transaction?.category_id ?? "");
  const [description, setDescription] = useState(transaction?.description ?? "");
  const [isPending, setIsPending] = useState(false);

  // 현재 유형의 카테고리만
  const filteredCategories = categories.filter((c) => c.type === type);

  const handleTypeChange = (newType: "income" | "expense") => {
    setType(newType);
    setCategoryId(""); // 유형 바뀌면 카테고리 초기화
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    const numAmount = Number(amount);
    if (!amount || Number.isNaN(numAmount) || numAmount <= 0) {
      toast.error("금액을 정확히 입력해주세요");
      return;
    }
    if (!categoryId) {
      toast.error("카테고리를 선택해주세요");
      return;
    }

    setIsPending(true);
    try {
      const data = {
        type,
        amount: numAmount,
        category_id: categoryId,
        date,
        description: description.trim() || null,
      };

      if (isEdit) {
        await updateTransaction(transaction.id, data);
        toast.success("거래를 수정했어요");
      } else {
        await createTransaction(data);
        toast.success("거래를 추가했어요");
      }

      onSuccess();
    } catch (error) {
      toast.error(isEdit ? "거래 수정에 실패했어요" : "거래 추가에 실패했어요", {
        description: "잠시 후 다시 시도해주세요.",
      });
      console.error("거래 작업 실패:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      {/* 유형 */}
      <TypeButtons value={type} onChange={handleTypeChange} />

      {/* 금액 */}
      <div className="space-y-1.5">
        <Label>금액</Label>
        <AmountInput value={amount} onChange={setAmount} />
      </div>

      {/* 날짜 */}
      <div className="space-y-1.5">
        <Label>날짜</Label>
        <DatePicker value={date} onChange={setDate} />
      </div>

      {/* 카테고리 */}
      <div className="space-y-1.5">
        <Label>카테고리</Label>
        {filteredCategories.length === 0 ? (
          <p className="rounded-md bg-bg-sunken p-3 text-[12px] text-fg-soft">
            {type === "income" ? "수입" : "지출"} 카테고리가 없어요. 카테고리 페이지에서 먼저
            만들어주세요.
          </p>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {filteredCategories.map((category) => (
              <CategoryChip
                key={category.id}
                category={category}
                active={categoryId === category.id}
                onClick={() => setCategoryId(category.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* 메모 */}
      <div className="space-y-1.5">
        <Label>
          메모 <span className="text-fg-soft">(선택)</span>
        </Label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="예: 팀 점심"
          maxLength={50}
          className="h-11 w-full rounded-lg border border-border bg-card px-3 text-[14px] text-fg placeholder:text-fg-soft hover:border-border-strong focus:border-peach-deep focus:outline-none focus:ring-2 focus:ring-peach-deep/20"
        />
      </div>

      {/* 액션 */}
      <div className="flex gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isPending}
          className="flex-1 cursor-pointer"
        >
          취소
        </Button>
        <Button
          type="submit"
          disabled={isPending || filteredCategories.length === 0}
          className="flex-1 cursor-pointer"
        >
          {isPending ? "저장 중..." : "저장"}
        </Button>
      </div>
    </form>
  );
}

// 카테고리 칩
function CategoryChip({
  category,
  active,
  onClick,
}: {
  category: Category;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-semibold transition-colors",
        active
          ? "border border-transparent bg-peach-soft text-peach-deep"
          : "border border-border bg-card text-fg-muted hover:border-border-strong hover:text-fg",
      )}
    >
      {category.name}
    </button>
  );
}

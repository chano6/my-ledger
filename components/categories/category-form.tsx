"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import type { ActionState, Category } from "@/lib/types";
import { Button } from "../ui/button";
import { ErrorMessage } from "../ui/error-message";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { SubmitButton } from "../ui/submit-button";

const COLOR_OPTIONS = [
  "#ef4444", // 빨강
  "#f59e0b", // 주황
  "#eab308", // 노랑
  "#22c55e", // 초록
  "#10b981", // 청록
  "#3b82f6", // 파랑
  "#6366f1", // 인디고
  "#8b5cf6", // 보라
  "#ec4899", // 핑크
  "#6b7280", // 회색
];

type CategoryFormProps = {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  defaultValues?: Category;
  submitLabel?: string;
};

export function CategoryForm({ action, defaultValues, submitLabel = "저장" }: CategoryFormProps) {
  const [state, formAction] = useActionState(action, null);
  const [selectedColor, setSelectedColor] = useState(defaultValues?.color || COLOR_OPTIONS[0]);

  return (
    <form action={formAction} className="max-w-md space-y-4">
      {defaultValues && <input type="hidden" name="id" value={defaultValues.id} />}

      <ErrorMessage message={state?.error} />

      <div className="grid gap-2">
        <Label htmlFor="type">유형</Label>
        <Select name="type" defaultValue={defaultValues?.type ?? "expense"}>
          <SelectTrigger id="type">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="expense">지출</SelectItem>
            <SelectItem value="income">수입</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="name">이름</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="예: 식비, 월급"
          defaultValue={defaultValues?.name}
          required
          maxLength={20}
        />
      </div>

      <div className="grid gap-2">
        <Label>색상</Label>
        <input type="hidden" name="color" value={selectedColor} />
        <div className="flex flex-wrap gap-2">
          {COLOR_OPTIONS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setSelectedColor(color)}
              className={`h-10 w-10 rounded-full border-2 transition-all ${
                selectedColor === color ? "border-foreground scale-110" : "border-transparent"
              }`}
              style={{ backgroundColor: color }}
              aria-label={`색상 ${color}`}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <SubmitButton className="flex-1" pendingLabel={defaultValues ? "수정 중..." : "저장 중..."}>
          {submitLabel}
        </SubmitButton>
        <Button type="button" variant="outline" asChild>
          <Link href="/categories">취소</Link>
        </Button>
      </div>
    </form>
  );
}

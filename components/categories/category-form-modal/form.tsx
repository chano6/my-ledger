"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { type ComponentType, type FormEvent, useState } from "react";
import { toast } from "sonner";
import { CategoryIcon } from "@/components/common/category-icon";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createCategory, updateCategory } from "@/lib/actions/categories";
import { CATEGORY_COLORS, type CategoryIconKey } from "@/lib/category-icons";
import type { Category, CategoryInput } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ColorPicker } from "./color-picker";
import { IconPicker } from "./icon-picker";

type CategoryFormProps = {
  category?: Category;
  onSuccess: () => void;
  onCancel: () => void;
};

export function CategoryForm({ category, onSuccess, onCancel }: CategoryFormProps) {
  const isEdit = !!category;

  // 폼 상태
  const [name, setName] = useState(category?.name ?? "");
  const [type, setType] = useState<"income" | "expense">(category?.type ?? "expense");
  const [color, setColor] = useState(category?.color ?? CATEGORY_COLORS[0]);
  const [icon, setIcon] = useState<CategoryIconKey>((category?.icon as CategoryIconKey) ?? "tag");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("카테고리 이름을 입력해주세요");
      return;
    }

    setIsPending(true);
    try {
      const data: CategoryInput = {
        name: name.trim(),
        type,
        color,
        icon,
      };

      if (isEdit) {
        await updateCategory(category.id, data);
        toast.success(`"${name}" 카테고리를 수정했어요`);
      } else {
        await createCategory(data);
        toast.success(`"${name}" 카테고리를 추가했어요`);
      }

      onSuccess();
    } catch (error) {
      toast.error(isEdit ? "카테고리 수정에 실패했어요" : "카테고리 추가에 실패했어요", {
        description: "잠시 후 다시 시도해주세요.",
      });
      console.error("카테고리 작업 실패:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      {/* 미리보기 */}
      <CategoryPreview name={name} type={type} color={color} icon={icon} />

      {/* 이름 */}
      <div className="space-y-1.5">
        <label htmlFor="name" className="text-[13px] font-semibold text-fg">
          카테고리 이름
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="예: 식비, 월급"
          maxLength={20}
          required
          className="h-11 w-full rounded-lg border border-border bg-card px-3 text-[14px] text-fg placeholder:text-fg-soft hover:border-border-strong focus:border-peach-deep focus:outline-none focus:ring-2 focus:ring-peach-deep/20"
        />
      </div>

      {/* 유형 */}
      <div className="space-y-1.5">
        <Label>유형</Label>
        <div className="grid grid-cols-2 gap-2">
          <TypeButton
            active={type === "expense"}
            onClick={() => setType("expense")}
            icon={TrendingDown}
            label="지출"
            activeClassName="border-coral-soft bg-coral-soft/40 text-coral"
          />
          <TypeButton
            active={type === "income"}
            onClick={() => setType("income")}
            icon={TrendingUp}
            label="수입"
            activeClassName="border-sage-soft bg-sage-soft/40 text-sage-deep"
          />
        </div>
      </div>

      {/* 색상 */}
      <div className="space-y-1.5">
        <Label>색상</Label>
        <ColorPicker value={color} onChange={setColor} />
      </div>

      {/* 아이콘 */}
      <div className="space-y-1.5">
        <Label>아이콘</Label>
        <IconPicker value={icon} onChange={setIcon} />
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
        <Button type="submit" disabled={isPending} className="flex-1 cursor-pointer">
          {isPending ? "저장 중..." : isEdit ? "수정하기" : "+ 카테고리 만들기"}
        </Button>
      </div>
    </form>
  );
}

// 유형 버튼 헬퍼
function TypeButton({
  active,
  onClick,
  icon: Icon,
  label,
  activeClassName,
}: {
  active: boolean;
  onClick: () => void;
  icon: ComponentType<{ className?: string }>;
  label: string;
  activeClassName: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border-2 py-3 text-[14px] font-semibold transition-all",
        active ? activeClassName : "border-border bg-card text-fg-muted hover:border-border-strong",
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}

// 미리보기 카드
function CategoryPreview({
  name,
  type,
  color,
  icon,
}: {
  name: string;
  type: "income" | "expense";
  color: string;
  icon: CategoryIconKey;
}) {
  const displayName = name.trim() || "새 카테고리";
  const typeLabel = type === "income" ? "수입" : "지출";

  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center gap-3">
        {/* 아이콘 */}
        <CategoryIcon icon={icon} color={color} size="lg" />

        {/* 정보 */}
        <div className="min-w-0 flex-1">
          <div className="truncate text-[15px] font-semibold text-fg">{displayName}</div>
          <div className="mt-0.5 text-[11.5px] text-fg-soft">미리보기</div>
        </div>

        {/* 유형 뱃지 */}
        <div className="flex items-center gap-1 text-[11.5px] font-medium text-fg-soft">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
          {typeLabel}
        </div>
      </div>
    </div>
  );
}

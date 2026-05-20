import { z } from "zod";

export const categorySchema = z.object({
  type: z.enum(["income", "expense"], {
    message: "유형을 선택해주세요.",
  }),
  name: z.string().min(1, "이름을 입력해주세요.").max(20, "이름은 20자 이하로 입력해주세요."),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "올바른 색상 코드가 아닙니다."),
});

export const updateCategorySchema = categorySchema.extend({
  id: z.string().uuid("올바르지 않은 카테고리입니다."),
});

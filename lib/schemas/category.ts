import { z } from "zod";

export const categorySchema = z.object({
  type: z.enum(["income", "expense"], {
    message: "유형을 선택해주세요",
  }),
  name: z.string().min(1, "이름을 입력해주세요").max(20, "이름은 20자 이내로 입력해주세요"),
  color: z.string().min(1, "색상을 선택해주세요"),
  icon: z.string().min(1, "아이콘을 선택해주세요").default("tag"), // ⭐ 추가
});

export const updateCategorySchema = categorySchema.extend({
  id: z.string().uuid("잘못된 카테고리 ID입니다."),
});

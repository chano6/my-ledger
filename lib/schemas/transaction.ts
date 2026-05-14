import { z } from "zod";

export const transactionSchema = z.object({
  type: z.enum(["income", "expense"], { message: "유형을 선택해주세요." }),
  amount: z.coerce
    .number({ message: "금액은 숫자여야 합니다." })
    .positive({ message: "금액은 0보다 커야 합니다." }),
  category_id: z.string().min(1, "카테고리를 선택해주세요.").uuid("올바르지 않은 카테고리입니다."),
  date: z.string().min(1, "날짜를 선택해주세요."),
  description: z.string().max(200, "메모는 200자 이하로 입력해주세요.").optional(),
});

export const updateTransactionSchema = transactionSchema.extend({
  id: z.string().uuid("올바르지 않은 거래입니다."),
});

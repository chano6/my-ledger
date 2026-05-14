"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { transactionSchema, updateTransactionSchema } from "../schemas/transaction";
import { createClient } from "../supabase/server";
import type { ActionState } from "../types";

export async function createTransaction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // 1. zod 스키마로 검증 + 반환
  const result = transactionSchema.safeParse({
    type: formData.get("type"),
    amount: formData.get("amount"),
    category_id: formData.get("category_id"),
    date: formData.get("date"),
    description: formData.get("description") || undefined,
  });

  // 2. 유효성 검사
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const { type, amount, category_id, date, description } = result.data;

  // 3. 현재 로그인된 사용자 확인
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "로그인이 필요합니다." };
  }

  // 4. DB에 INSERT
  const { error } = await supabase.from("transactions").insert({
    user_id: user.id,
    type,
    amount,
    category_id,
    date,
    description: description || null,
  });

  if (error) {
    console.error("거래 추가 실패:", error);
    return { error: "거래 추가에 실패했습니다." };
  }

  // 5. 캐싱 갱신 + 페이지 이동
  revalidatePath("/transactions");
  revalidatePath("/dashboard");
  redirect("/transactions");
}

export async function deleteTransaction(id: string) {
  if (!id) {
    throw new Error("거래 ID가 필요합니다.");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("로그인이 필요합니다.");
  }

  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("거래 삭제 실패:", error);
    throw new Error("거래 삭제에 실패했습니다.");
  }

  revalidatePath("/transactions");
  revalidatePath("/dashboard");
}

export async function updateTransaction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // 1. Zod 스키마로 검증 + 변환 (id 포함)
  const result = updateTransactionSchema.safeParse({
    id: formData.get("id"),
    type: formData.get("type"),
    amount: formData.get("amount"),
    category_id: formData.get("category_id"),
    date: formData.get("date"),
    description: formData.get("description") || undefined,
  });

  // 2. 유효성 검사
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const { id, type, amount, category_id, date, description } = result.data;

  // 3. 사용자 확인
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "로그인이 필요합니다." };
  }

  // 4. DB UPDATE
  const { error } = await supabase
    .from("transactions")
    .update({
      type,
      amount,
      category_id,
      date,
      description: description || null,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("거래 수정 실패:", error);
    return { error: "거래 수정에 실패했습니다." };
  }

  // 5. 캐싱 갱신 + 페이지 이동
  revalidatePath("/transactions");
  revalidatePath("/dashboard");
  redirect("/transactions");
}

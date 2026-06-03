"use server";

import { revalidatePath } from "next/cache";
import { transactionSchema, updateTransactionSchema } from "../schemas/transaction";
import { createClient } from "../supabase/server";
import type { TransactionInput } from "../types";

export async function createTransaction(data: TransactionInput): Promise<void> {
  // 1. zod 스키마로 검증
  const result = transactionSchema.safeParse(data);

  if (!result.success) {
    throw new Error(result.error.issues[0].message);
  }

  const { type, amount, category_id, date, description } = result.data;

  // 2. 현재 로그인된 사용자 확인
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("로그인이 필요합니다.");
  }

  // 3. DB에 INSERT
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
    throw new Error("거래 추가에 실패했습니다.");
  }

  // 4. 캐싱 갱신
  revalidatePath("/transactions");
  revalidatePath("/dashboard");
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

export async function updateTransaction(id: string, data: TransactionInput): Promise<void> {
  // 1. zod 검증 (id 포함)
  const result = updateTransactionSchema.safeParse({ id, ...data });

  if (!result.success) {
    throw new Error(result.error.issues[0].message);
  }

  const { type, amount, category_id, date, description } = result.data;

  // 2. 사용자 확인
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("로그인이 필요합니다.");
  }

  // 3. DB UPDATE
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
    throw new Error("거래 수정에 실패했습니다.");
  }

  revalidatePath("/transactions");
  revalidatePath("/dashboard");
}
